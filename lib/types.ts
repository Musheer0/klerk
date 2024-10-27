import { Prisma } from "@prisma/client";

export type UserWithAccount = Prisma.UserGetPayload<{
    include:{
        accounts: {
            select:{
                provider: true,
                
            }
        }
    }
}>
export type session_cookie = {
    "authjs.session-token":string,
}