import React, { useRef } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { getUserToken } from '@/lib/Helpers/getUserToken'


export default function Checkout({cartId}: {cartId:string}) {
let detailsInput=useRef <HTMLInputElement|null>(null);
let cityInput=useRef<HTMLInputElement|null>(null);
let phoneInput=useRef<HTMLInputElement|null>(null);




 async function checkoutSession(){
  const token=await getUserToken()
const shippingAddress={
  details:detailsInput.current?.value,
city:cityInput.current?.value,
  phone:phoneInput.current?.value
}
console.log(shippingAddress)
const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
method:'POST',
body:JSON.stringify({shippingAddress}),
headers :{
 token :token+'',
 'content-type':'application/json'
}

});
const data=await response.json();

if (data.status=='success') {
    location.href=data.session.url
}
 }
 

  return <>
  <Dialog>
   <form>
        <DialogTrigger asChild>
          <Button className='w-full mt-3 bg-purple-300 hover:bg-fuchsia-300 text-black' >Proceed to checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>
             Please add your address correctly
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city"   />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone"  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Cash</Button>
            <Button onClick={checkoutSession} className=' cursor-pointer' type="submit">Visa</Button>
          </DialogFooter>
        </DialogContent>
      </form>
  </Dialog>
  
  
  
  
  </>
  
}
