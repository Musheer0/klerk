import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { AUTH_ROUTES, PRIVATE_ROUTES } from "./routes";

export default auth((req)=>{
    const {nextUrl} = req
    const  isprivateroute = PRIVATE_ROUTES.includes(nextUrl.pathname);
    const isauthroute = AUTH_ROUTES.includes(nextUrl.pathname);
    const isLoggedIn = !!req.auth;
    const isadminroute = req.nextUrl.pathname==='/admin'
    if(isLoggedIn){
        if(isauthroute){
            return NextResponse.redirect(new URL('/home',req.nextUrl) );
        }
        //todo add role based routes ,tip:host admin site seperately
        if(isadminroute){
            return NextResponse.redirect(new URL('/home',req.nextUrl) );

        }
    }
    else{
        if(isprivateroute || isadminroute){
            return NextResponse.redirect(new URL('/sign-in',req.nextUrl) );
        }
    }
})