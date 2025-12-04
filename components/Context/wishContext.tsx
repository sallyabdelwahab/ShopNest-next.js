'use client'
import { WishResponse } from "@/app/interfaces/getWish";
import { getUserToken } from "@/lib/Helpers/getUserToken";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishContext = createContext<{
    wishData: WishResponse | null,
     setWishData: (value:WishResponse|null)=>void,
    wishing: boolean,
    setWishing: (value: boolean) => void,
    getWishList: () => void,
}>({
    wishData: null,
    setWishData: ()=>{},

    wishing: false,
    setWishing: () => {},
    getWishList: () => {}
});

export default function WishContextProvider({ children }: { children: ReactNode }) {
    const [wishData, setWishData] = useState<WishResponse | null>(null);
    const [wishing, setWishing] = useState<boolean>(true);

    async function getWishList() {
        const token=await getUserToken()
        setWishing(true);

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method: "GET",
            headers:{
                token:token+''
            }

        });

         const data :WishResponse= await response.json();
        
        setWishData(data)
        
        setWishing(false);
        console.log(data);
        
        }
        
        
        useEffect(()=>{
        
       getWishList()
        
        },[]
        
        )
      
    

    return (
        <WishContext.Provider value={{ wishData, setWishData, getWishList, wishing, setWishing }}>
            {children}
        </WishContext.Provider>
    );
}
