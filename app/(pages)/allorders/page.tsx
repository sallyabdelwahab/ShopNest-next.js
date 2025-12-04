'use client'




import Loading from '@/app/loading';
import { formatCurrency } from '@/lib/Helpers/formatPrice'
import React, { useContext, useEffect, useState } from 'react'

export default function AllOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setloading] = useState<boolean>(false);

    async function getAllOrders() {

setloading(true)

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/' + localStorage.getItem('userId'))
        const data = await response.json()
        
        console.log(data)
setOrders(data)
setloading(false)
    }
    useEffect(() => {
        getAllOrders()
    }, [])


   
  
       
  return (
   
  
 
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
      <p className="text-muted-foreground mt-1">{orders.length} orders found</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
        <div className="lg:col-span-2 space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
            >
              {/*   البيانات داخل order فيها products */}
              <img
                src={order.cartItems?.[0]?.product?.imageCover}
                alt={order.cartItems?.[0]?.product?.title}
                className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                      {order.cartItems?.[0]?.product?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.cartItems?.[0]?.product?.brand?.name} •{' '}
                      {order.cartItems?.[0]?.product?.category?.name}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-semibold">
                      {formatCurrency(order.totalOrderPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
          </div>
      
  )

}
