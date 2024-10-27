"use server"
export const LoginMultiSession = async()=>{
    /*
    this fun handles login for multi-session its not perfect but more like beta
    any genius can fix this , all i know is basics on js from bro code channel
    */
   //store cookie in temp-cookie before logout in case user cancels sign-in in login page (ie: user comes back, we will handle this using middleware);
    const temp_cookie =  await fetch(`${process.env.NEXT_PUBLIC_APP_URL!}/api/addsession/temp`,{method:'POST'});
    if(temp_cookie.ok){
      // await signOut();
      /*
      how will be handel the new login session well there is a magic you can see in 
      1. modified oauth login function
      2. middleware
      */
    }
}