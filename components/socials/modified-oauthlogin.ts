"use client"
import { signIn } from "next-auth/react"
import Cookies from "js-cookie";
export enum OAuthProviders {
    Google = 'google',
    Facebook = 'facebook',
    GitHub = 'github',
    Twitter = 'twitter',
    // Add more providers as needed
}

export const OauthLogin = async (provider: OAuthProviders) => {
//   isModal &&   signOut({redirect:false});
const isLoddegin = Cookies.get("authjs.session-token")
    if(isLoddegin) return ;
     await signIn(provider);
};
