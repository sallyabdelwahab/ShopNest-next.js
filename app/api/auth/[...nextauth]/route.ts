
import { FailedLoginResponse, SuccessLoginResponse } from "@/app/interfaces";
import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials";
import { headers } from "next/headers";
const handler = NextAuth({
 providers:[
CredentialsProvider({
    name:"Credentials",

    credentials:{
  email:{},
  password:{}



    },
    authorize:async(Credentials)=>{
        const response=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{

method:'POST',
body:JSON.stringify({
    email:Credentials?.email,
    password:Credentials?.password
}),
headers:{'Content-Type':'application/json'}
 });
   const payload :SuccessLoginResponse|FailedLoginResponse=await response.json()
   if ('token' in payload) {
    return{
        id:payload.user.email,
        user: payload.user,
        token:payload.token
    }
   }else{
    throw new Error(payload.message)
   }

    }
})




    

 ],
 callbacks:{
jwt:({token,user})=>{
if (user) {
    token.user=user.user;
    token.token=user.token;
    
}
return token;

},
session:({session,token})=>{
session.user=token.user
return session;
}



 },
 pages:{
    signIn:'/login',
    error:'/login'
 },
  secret: process.env.NEXTAUTH_SECRET
})






export { handler as GET, handler as POST }