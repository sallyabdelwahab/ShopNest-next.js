'use client'

import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Heart, Loader, Loader2, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'
import AddToWishList from '../WishList/AddToWishList'

import { decode } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'

import { addToCartAction } from '@/app/(pages)/products/_actions/addToCartaction'
import { useRouter } from 'next/navigation'




export default function AddToCart({ productId }: { productId: string }) {
  const [isloading, setIsLoadind] = useState(false)
  const { getCart, setCartData } = useContext(CartContext)
 const session=useSession()

  let router=useRouter()




  async function addProductTOcarat() {
   
     if (session.status=='authenticated') {
       setIsLoadind(true)
  const data=await addToCartAction(productId)
    
      // await getCart();
      setCartData(data)
      data.status == 'success' && toast.success(data.message)
      setIsLoadind(false)

      console.log(data);

      
     }else{
router.push('/login')

     }
   

  }

  




  return <>

    <CardFooter className='gap-1'>
      <Button disabled={isloading} onClick={addProductTOcarat} className='grow'> {isloading ? <Loader2 className='animate-spin' /> : <ShoppingCartIcon />}   Add TO Cart</Button>

      <AddToWishList productId={productId} />


    </CardFooter>








  </>
}







