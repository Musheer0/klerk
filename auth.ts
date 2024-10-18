import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import prisma from "./db"
import { send_email } from "./lib/actions/resend";
import { renderToStaticMarkup } from "react-dom/server";
import { WelcomeEmailTemplate } from "./components/email-templates/welcome-email";
import { defualt_token_life } from "./defualt-values";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
        credentials: {
            email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
            password: { label: 'Password', type: 'password' },
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
                    try {
                        const token = await prisma.verificationToken.create({
                            data:{
                                identifier: user.id!,
                                expires: defualt_token_life
                            }
                        });
                    const response =   await send_email(
                        'Action Required: Verify Your Email to Complete Your Registration',
                        WelcomeEmailTemplate({firstName: user.name!,verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/verfiy/${token.token}` })
                      );
                      if(response.success) {
                        throw new Error("Email not verified check your email to verify");
                      }
                    } catch (error) {
                        throw new Error("Email not verified");
                    }
                }

                // Compare password
                const isCorrectPassword = await bcrypt.compare(credentials.password as string, user.password!);
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }
                // Return the user object if authentication is successful
                return user;
            } catch (error:any) {
                // Log the error for debugging
                console.error("Authorization error:", error);
                throw new Error(error.message || "Invalid credentials");
            }
        },
    }),

],
  session:{
    strategy: 'jwt',
  },
  callbacks:{
    async session({user,session}){
        return session
    }
  },
  adapter: PrismaAdapter(prisma),
  events:{
    async linkAccount({user, account}){
        if(account.provider==='github'){
            await prisma.user.update({
                where:{
                    id: user.id
                },
                data:{
                    emailVerified: new Date()
                }
            })
        }
    }
  }
})