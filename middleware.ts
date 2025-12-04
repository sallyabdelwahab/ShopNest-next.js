import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



const protectePage=['/cart','/prpfile'];
const authPage=['/login','/register'];


export default async function middleware(req:NextRequest) {
    const token=await getToken({req});
if (protectePage.includes(req.nextUrl.pathname)) {
    if (token) {
        return NextResponse.next();
        
    }else{
  let redirectUrl=new URL('/login',process.env.NEXTAUTH_URL);
  redirectUrl.searchParams.set('callback-url',req.nextUrl.pathname)
return NextResponse.redirect(redirectUrl)

    }
}
if (authPage.includes(req.nextUrl.pathname)) {
    if (!token) {
        return NextResponse.next();
        
    }else{
  let redirectUrl=new URL('/',process.env.NEXTAUTH_URL);
return NextResponse.redirect(redirectUrl)

    }
}

return NextResponse.next();



}