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
    GitHub,
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
            throw new Error("Email and password are required");
          }

          // Find user by email
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          // User not found
          if (!user) {
            throw new Error("Invalid credentials");
          }

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
            throw new Error("Email not verified. Check your email to verify.");
          }

          // Compare password
          const isCorrectPassword = await bcrypt.compare(
            credentials.password as string,
            user.password!
          );
          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }

          // Return the user object if authentication is successful
          return user;
        } catch (error: any) {
          // Log the error for debugging
          console.error("Authorization error:", error);
          throw new Error(error.message || "Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ user, session , token}) {
      session.user.id = token.sub!
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  events: {
    async linkAccount({ user, account }) {
      if (account.provider === "github") {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        });
      }
    },
  },
});
