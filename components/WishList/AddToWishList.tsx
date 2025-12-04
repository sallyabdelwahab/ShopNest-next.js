'use client'
import React, { useContext, useState } from 'react'
import { WishContext } from '../Context/wishContext';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { getUserToken } from '@/lib/Helpers/getUserToken';

export default function AddToWishList({ productId }: { productId: string }) {
    const { wishData, setWishData, getWishList } = useContext(WishContext)
    const [isWished, setIsWished] = useState(false)
    const [isWishing, setIsWishing] = useState(false);

    async function addProductTOWishList() {
        const token=await getUserToken();
        setIsWishing(true)

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                token: token+'',
"Content-Type":"application/json"

            }
        });

        const data = await response.json();
        await getWishList();
        if (data.status === 'success') toast.success(data.message)
        setIsWished(true)
        setIsWishing(false)

        console.log(data);
    }

    return (
        <Button onClick={addProductTOWishList} className="cursor-pointer ">
            {isWishing ? (
                <Loader2 className="animate-spin size-5" />
            ) : isWished ? (
                <Heart className="size-5 text-red-500 fill-red-500" />
            ) : (
                <Heart className="size-5  " />
            )}
        </Button>
    )
}
