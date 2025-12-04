'use server'
import { getUserToken } from '@/lib/Helpers/getUserToken';

import React from 'react'

export async function addToCartAction(productId:string) {
       const token=await getUserToken()
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'POST',

        body: JSON.stringify({ productId }),
        headers: {
          token: token+'',
          "Content-Type": "application/json"

        }

      });
      const data = await response.json();
  return data 
}

