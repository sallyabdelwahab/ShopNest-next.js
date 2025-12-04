'use client'
import { CartResponse } from '@/app/interfaces'
import Loading from '@/app/loading'
import Checkout from '@/components/Checkout/Checkout'
import { CartContext } from '@/components/Context/CartContext'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/Helpers/formatPrice'
import { getUserToken } from '@/lib/Helpers/getUserToken'
import { Loader2, Trash2 } from 'lucide-react'

import Link from 'next/link'

import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'




export default function Cart() {
  let { cartData, isLoading, getCart, setCartData } = useContext(CartContext);

  const [removeingId, setRemoveingId] = useState<string | null>(null)

  const [updateId, setupdateId] = useState<string | null>(null)

  const [isClearing, setIsClearing] = useState<boolean>(false)







  useEffect(() => {
    if (!cartData || typeof cartData?.data.products[0]?.product === 'string') {
      getCart();
    }
  }, [cartData, getCart]);

  async function removeCartItem(productId: string) {
    const token=await getUserToken()
    setRemoveingId(productId)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      method: 'DELETE',
      headers: {
        token: token+''



      }

    });
    const data: CartResponse = await response.json();
    console.log(data);
    if (data.status == 'success') {
      toast.success('product removed successfully');
      setCartData(data)
    }
    setRemoveingId(null)
  }
  async function clearCart() {
    const token=await getUserToken()
    setIsClearing(true)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/', {
      method: 'DELETE',
      headers: {
        token: token+''



      }

    });
    const data: CartResponse = await response.json();
    console.log(data);
    if (data.message == 'success') {

      setCartData(null)
    }
    setIsClearing(false)
  }
  async function updateCartItem(productId: string, count: number) {
    const token=await getUserToken()

    setupdateId(productId)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      method: 'PUT',
      body: JSON.stringify({ count }),
      headers: {
        token: token+'',
        'content-type': 'application/json'



      }

    });
    const data: CartResponse = await response.json();
    console.log(data);
    if (data.status == 'success') {
      toast.success('product quantity updated successfully');
      setCartData(data)
    }
    setupdateId(null)
  }






  return <>
    {isLoading || typeof cartData?.data.products[0]?.product == 'string' ? <Loading /> : cartData?.numOfCartItems! > 0 ?
      <div className="container mx-auto px-4 py-6">
        <h1 className='text-3xl front-bold tracking-tight '> Shopping Cart</h1>
        <p className='text-muted-foreground mt-1'> {cartData?.numOfCartItems} item in your cart</p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
          <div className="lg:col-span-2 space-y-4">
            {cartData?.data.products.map((product) =>
              <div key={product._id} className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
                <img src={product.product.imageCover} alt={product.product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                    <div className="min-w-0">
                      <h3 className='font-semibold text-base md:text-lg line-clamp-2'>{product.product.title}</h3>
                      <p className='text-sm text-muted-foreground mt-1'>
                        {product.product.brand.name}.{product.product.category.name}
                      </p>
                    </div>


                    <div className="text-right shrink-0">
                      <div className="font-semibold">
                        {formatCurrency(product.price)}
                      </div>
                    </div>
                  </div>


                  <div className="mt-3 flex items-center justify-between" >

                    <div className="flex items-center gap-2">
                      <button aria-label='decrease' disabled={product.count == 1} onClick={() => updateCartItem(product.product._id, product.count - 1)} className='size-8 rounded-lg border hover:bg-accent'>
                        -
                      </button>

                      <span className='w-6 text-center font-medium'>{updateId == product.product._id ? <Loader2 className='animate-spin size-5' /> : product.count}</span>
                      <button aria-label='increase' onClick={() => updateCartItem(product.product._id, product.count + 1)} className='size-8 rounded-lg border hover:bg-accent'> + </button>
                    </div>

                    <button onClick={() => removeCartItem(product.product._id)} aria-label='remove' disabled={removeingId == product.product._id} className='text-destructive hover:underline text-sm cursor-pointer flex gap-1 items-center'> {removeingId == product.product._id && <Loader2 className='animate-spin size-3' />} Remove </button>
                  </div>
                </div>
              </div>)}
          </div>


          <div className="lg:col-span-1 sticky top-18">
            <div className="rounded-xl border p-5 shadow-sm">
              <h2 className='text-lg font-semibold'>order summary</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className='text-sm text-muted-foreground'>Subtotal({cartData?.numOfCartItems} items)</span>
                  <span className='font-semibold'>{formatCurrency(cartData?.data.totalCartPrice!)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className='text-sm text-muted-foreground'>Shipping</span>
                  <span className='text-emerald-600 font-medium'>Free</span>
                </div>
              </div>

              <div className="my-4 border-t">

                <div className="flex items-center justify-between">
                  <span className='text-base font-semibold'>Total</span>
                  <span className='text-base font-bold'>{formatCurrency(cartData?.data.totalCartPrice!)}</span>

                </div>
                <Checkout cartId={cartData?.cartId!} />
                <button className='w-full mt-3 h-11 rounded-xl border bg-fuchsia-300 hover:bg-purple-300'>Continue Shopping</button>

              </div>
            </div>
            <Button onClick={clearCart} variant={'outline'} className='text-destructive hover:text-destructive mt-2 ms-auto flex'>{isClearing ? <Loader2 className='animate-spin size-3' /> : <Trash2 />}  Clear Cart</Button>
          </div>
        </div>
      </div> : <div className='min-h-[60vh] flex justify-center items-center flex-col'>
        <h2 className='text-2xl font-semibold mb-2'>Your Cart Is Empty</h2>
        <Link href={'/products'}>
          <button className=' border rounded-xl p-2 bg-purple-300 text- font-medium hover:bg-fuchsia-300' >Add Products</button>

        </Link>
      </div>
    }





















  </>

}
