export const PUBLIC_ROUTES= [
    // routes that do not require auth users
    '/api',
        '/verify'

]
export const PRIVATE_ROUTES= [
    // routes that require auth users
    '/home',
    '/account',
    '/api/toggle'
]
export const AUTH_ROUTES= [
    // routes that is available for non-auth users
    '/sign-in',
    '/sign-up',

]