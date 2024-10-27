import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./db";
import { send_email } from "./lib/actions/resend";
import { WelcomeEmailTemplate } from "./components/email-templates/welcome-email";

const defualt_token_life = new Date(Date.now() + 15 * 60 * 1000);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({}),
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // Validate credentials
          if (!credentials.email || !credentials.password) {
            throw new Error("Please provide both your email and password to continue.");
          }

          // Find user by email
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
            include: {
              accounts: {
                select: {
                  provider: true
                }
              }
            }
          });

          // User not found
          if (!user) {
            throw new Error("We couldn't find an account with that email. Please check your details and try again.");
          }

          // If user has OAuth account only
          if (user.accounts.length !== 0 && !user.password) {
            throw new Error("It seems you signed up using an OAuth provider. Please use one of the available login options above.");
          }
          else{
             // Check if email is verified
          if (!user.emailVerified) {
            // Create a verification token
            const token = await prisma.verificationToken.create({
              data: {
                identifier: user.id!,
                expires: defualt_token_life,
              },
            });

            // Send verification email
            await send_email(
              "Action Required: Verify Your Email to Complete Your Registration",
              WelcomeEmailTemplate({
                firstName: user.name!,
                verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/verify/${token.token}`,
              })
            );

            // Throw an error to inform the user
            throw new Error("Your email is not verified yet. We've sent a verification email to your inbox. Please check and verify your email to continue.");
          }

          }
          // Compare password
          const isCorrectPassword = await bcrypt.compare(
            credentials.password as string,
            user.password!
          );
          if (!isCorrectPassword) {
            throw new Error("The email or password you entered is incorrect. Please try again.");
          }

          // Return the user object if authentication is successful
          return user;
        } catch (error: any) {
          // Log the error for debugging
          console.error("Authorization error:", error);
          throw new Error(error.message || "We encountered an issue while processing your request. Please try again later.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ user, session, token }) {
      session.user.id = token.sub!;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  events: {
    async linkAccount({ user, account }) {
      if (account.provider === "github" || account.provider==='googles') {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        });
      }
    }
  },
  secret: process.env.AUTH_SECRET
});
