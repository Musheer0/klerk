export const PUBLIC_ROUTES= [
    // routes that do not require auth users
    '/verify',
    '/api',

]
export const PRIVATE_ROUTES= [
    // routes that require auth users
    '/home',
    '/account'
]
export const AUTH_ROUTES= [
    // routes that is available for non-auth users
    '/sign-in',
    '/sign-up'
]