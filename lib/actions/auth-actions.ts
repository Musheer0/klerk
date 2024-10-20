"use server"
import { auth, signIn } from "@/auth"
import prisma from "@/db"
import { CredentialsLoginSchema, CredentialsRegisterSchema, UpdateEmailSchema, UpdateProfileSchema } from "@/zod-schema/auth-schema"
import { User } from "@prisma/client"
import { AuthError } from "next-auth"
import { z } from "zod"
import { send_email } from "./resend"
import { WelcomeEmailTemplate } from "@/components/email-templates/welcome-email"
import { compare, hash } from "bcryptjs"
import { PasswordChangeEmailTemplate } from "@/components/email-templates/password-changed-email"
import { EmailChangeEmailTemplate } from "@/components/email-templates/email-change"
import { generateOtp } from "@/otp-generator"
import { OtpEmailTemplate } from "@/components/email-templates/otp-email"
import { EditNameSchema } from "@/zod-schema/edit-account"

// Default token expiration time (15 minutes)
const defualt_token_life = new Date(Date.now() + 15 * 60 * 1000);

// Log in a user using credentials
export const Login = async (value: z.infer<typeof CredentialsLoginSchema>) => {
    const { error, data } = CredentialsLoginSchema.safeParse(value);
    
    if (!error) {
        try {
            await signIn('credentials', {
                ...data,
                redirectTo: '/home'
            });
        } catch (error) {
            if (error instanceof AuthError) {
                return { error: error.cause?.err?.message || 'invalid credentials' };
            } else {
                return { error: 'internal server error' };
            }
        }
    } else {
        return { error: 'invalid credentials' };
    }
};

// Register a new user
export const RegisterUser = async (value: z.infer<typeof CredentialsRegisterSchema>) => {
    const { error, data } = CredentialsRegisterSchema.safeParse(value);
    
    if (!error) {
        try {
            // Check if the email already exists
            const existing_user = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
            });
            if (existing_user) return { error: 'email already taken' };

            const hashed_password = await hash(data.password, 10);

            // Create a new user in the database
            const user = await prisma.user.create({
                data: {
                    ...data,
                    password: hashed_password
                }
            }) as User;

            // Create a verification token for email verification
            const token = await prisma.verificationToken.create({
                data: {
                    identifier: user.id!,
                    expires: defualt_token_life
                }
            });

            // Send a verification email
            const response = await send_email(
                'Action Required: Verify Your Email to Complete Your Registration',
                WelcomeEmailTemplate({
                    firstName: user.name!,
                    verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/verify/${token.token}`
                }),
                user.email
            );
            return response;
        } catch (er) {
            console.log(er);
            return { error: 'internal server error' };
        }
    } else {
        return { error: 'invalid credentials' };
    }
};

// Reset a user's password
export const resetpassword = async (password: string, otp: string, tokenId: string) => {
    if (!password || !otp || !tokenId) return { error: 'missing data' };

    try {
        const session = await auth();
        if (!session?.user?.id) return { error: 'access denied' };

        // Validate OTP and token
        const token = await prisma.verificationToken.findFirst({
            where: {
                identifier: session.user.id!,
                token: tokenId,
                otp
            }
        });

        if (token?.identifier === session.user.id!) {
            const hashed_password = await hash(password, 10);
            if (hashed_password) {
                // Update user's password in the database
                const user = await prisma.user.update({
                    where: {
                        id: session.user.id!
                    },
                    data: {
                        password: hashed_password
                    }
                });

                // Send email notification about password change
                await send_email(
                    'Your Account Password Was Changed',
                    PasswordChangeEmailTemplate({ firstName: user.name!, changeDate: new Date().toISOString() }),
                    user.email!
                );
                return { user };
            }
        }
    } catch {
        return { error: 'server error, try again' };
    }
};

// Change a user's email
export const changeEmail = async (email: string, otp: string, tokenId: string, password:string) => {
    if (!email || !otp || !tokenId) return { error: 'missing data' };

    try {
        const session = await auth();
        if (!session?.user?.id) return { error: 'access denied' };

        // Validate OTP and token
        const token = await prisma.verificationToken.findFirst({
            where: {
                identifier: session.user.id!,
                token: tokenId,
                otp
            }
        });

        if (token?.identifier === session.user.id!) {
            const iscorrectpassword = await authenticatePassword(password);
            if(iscorrectpassword)
            if (email) {
                // Update user's email in the database
                const user = await prisma.user.update({
                    where: {
                        id: session.user.id!
                    },
                    data: {
                        email,
                        previous_email: session.user.email!
                    }
                });

                // Send email notification about email change
                await send_email(
                    'Your Account Email Was Changed',
                    EmailChangeEmailTemplate({
                        firstName: user.name!,
                        changeDate: new Date().toISOString(),
                        newEmail: email,
                    }),
                    session.user.email!
                );
                return { user };
            }
            else{ return {error: 'email not found'}}
            else return{ error: 'invalid password'}
        }
    } catch {
        return { error: 'server error, try again' };
    }
};

// Send an OTP for email verification or password reset
export const sendOtp = async (title: string, subject: string, email?:string) => {
    if (title) {
        const session = await auth();
        if (session?.user?.email) {
            const otp = await generateOtp(4);
            // Create a verification token with the OTP
            const token = await prisma.verificationToken.create({
                data: {
                    identifier: session.user.id!,
                    expires: defualt_token_life,
                    otp
                }
            });

            // Send the OTP via email
            const response = await send_email(
                subject,
                OtpEmailTemplate({
                    firstName: session.user.name!,
                    otp: token.otp!,
                    title,
                    expirationTime: 'your otp will expire in 15 mins'
                }),
                email ? email:session.user.email
            );
            if(response.success) return {token: token.token};
            else return {error:response.error};
        }
    } else {
        return { error: 'missing data' };
    }
};

// Update user's profile information
export const updateProfile = async (value: z.infer<typeof EditNameSchema>) => {
    const { error, data } = UpdateProfileSchema.safeParse(value);

    if (!error) {
        try {
            const session = await auth();
            if (!session?.user) return { error: 'access denied' };

            // Update user's profile in the database
            const user = await prisma.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    ...data
                }
            }) as User;
            return { user };
        } catch {
            return { error: 'internal server error' };
        }
    } else {
        return { error: 'invalid credentials' };
    }
};

// Authenticate user's password
export const authenticatePassword = async (password: string) => {
    if (password) {
        try {
            const session = await auth();
            if (session?.user) {
                const user = await prisma.user.findUnique({ where: { id: session.user.id } });
                if (user) {
                    if (!user.emailVerified) {
                        return { error: 'please verify your email first' };
                    }
                    const iscorrectpassword = await compare(password, user.password!);
                    if (iscorrectpassword) return { success: iscorrectpassword };
                    else return { error: 'incorrect password' };
                } else {
                    return { error: 'user not found' };
                }
            } else {
                return { error: 'access denied' };
            }
        } catch {
            return { error: 'server error' };
        }
    } else {
        return { error: 'missing data' };
    }
};

// Delete a user's account
export const deleteAccound = async (password: string) => {
    const session = await auth();
    if (session?.user) {
        const isCorrectPassword = await authenticatePassword(password);
        if ((isCorrectPassword).success) {
            // Delete user from the database
            await prisma.user.delete({
                where: { id: session.user.id }
            });
            return { success: true };
        }
    } else {
        return { error: 'access denied' };
    }
};

// Verify a user's email using a token
export const VerifyEmail = async (tokenId: string): Promise<{ success?: string; email?: string; error?: string }> => {
    if (!tokenId) return { error: 'invalid credentials' };
    
    try {
        const token = await prisma.verificationToken.findFirst({
            where: {
                token: tokenId
            }
        });

        if (token) {
            // Check if the token is still valid
            if (token.expires.getTime() > Date.now()) {
                if (token.identifier) {
                    // Update user's email verification status
                    const updated_user = await prisma.user.update({
                        where: {
                            id: token.identifier
                        },
                        data: {
                            emailVerified: new Date()
                        },
                        select: {
                            email: true
                        }
                    });

                    // Delete the used verification token
                    await prisma.verificationToken.delete({
                        where: {
                            identifier_token: {
                                token: tokenId,
                                identifier: token.identifier
                            }
                        }
                    });
                    return { success: 'email verified, now login', email: updated_user.email! };
                } else {
                    return { error: 'invalid credentials' };
                }
            } else {
                return { error: 'token expired try again' };
            }
        } else {
            return { error: 'token not found' };
        }
    } catch (error) {
        console.log(error);
        return { error: 'server error, try again' };
    }
};

// Get the currently authenticated user session
export const GetSessionUser = async () => {
    console.log('hello')
    const session = await auth();
    console.log(session)
    if (session?.user?.id) {
        // Retrieve user details from the database
        const user = await prisma.user.findUnique({
            where: { id: session.user.id! }
        });
        console.log(user)
        return user;
    }
};
export const sendChangeEmailVerificationCode = async(value:z.infer<typeof UpdateEmailSchema>, password:string)=>{
    const {error ,data} = UpdateEmailSchema.safeParse(value);
    if(!error){
     try {
         const iscorrectpassword = await authenticatePassword(password);
         if(iscorrectpassword){
            const response  = sendOtp('Confirm Your Email Change Request', 'Your One-Time Password (OTP) for Email Change',data.email);
            return response
         }
         else{
            return {error: 'incorrect password'}
         }
     } catch (error) {
        console.log(error, 'email change')
        return {error: 'server'}
     }
    }
    else return {error: 'user not found'}

}