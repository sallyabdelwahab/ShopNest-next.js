'use client'

import { CartResponse } from "@/app/interfaces";
import { getUserToken } from "@/lib/Helpers/getUserToken";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";




export const CartContext=createContext <{
cartData:CartResponse|null,
setCartData:(value:CartResponse|null)=>void,
isLoading:boolean,
setIsLoading:(value:boolean)=>void,
getCart:()=>void,


}>({
    cartData:null,
setCartData:()=>{},
isLoading:false,
setIsLoading:()=>{},
getCart(){}

});
export default function CartContextProvider({children}: {children:ReactNode}){

const[cartData,setCartData]=useState<CartResponse|null>(null);
const[isLoading,setIsLoading]=useState<boolean>(true);
const[userId,setUserId]=useState<string>('');


async function getCart() {
 const token= await getUserToken()
 if (session.status=='authenticated') {
    

    const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart',{

method:"GET",
headers:{
token:token+""


}



    }






    );
 
    const data :CartResponse= await response.json();

setCartData(data);
if (cartData?.data.cartOwner) {
    localStorage.setItem('userId',cartData.data.cartOwner)
    
}
setIsLoading(false);
console.log(data);
 }
}
const session=useSession()

useEffect(()=>{

getCart()

},[session.status]

)





return <CartContext.Provider value={{cartData,setCartData,isLoading,setIsLoading,getCart}}> 
{children}
</CartContext.Provider>






}
