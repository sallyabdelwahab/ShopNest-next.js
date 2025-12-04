'use client'
import React from 'react';
import Ballpit from '../components/Ballpit/Ballpit';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


export default function HeroSection() {
 const session=useSession()
  return <>
    <div className=" h-screen w-full overflow-hidden">
    
      <div className="absolute w-full h-screen inset-0 pointer-events-none">
        <Ballpit
  count={150}
  gravity={0.01}
  friction={0.9975}
  wallBounce={0.95}
  followCursor={true}
  ballColors={[0x4B0082, 0x8A2BE2, 0x6A0DAD]}
  lightColor={0xD8BFD8}
/>

      </div>

     
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-black px-4 ">
        <h1 className="text-3xl font-bold ">Welcome to ShopNest</h1>
        <p className="mt-2 text-lg  ">
          Discover amazing products at the best prices.
        </p>
        <div className="flex gap-4 mt-7 mb-28">
        {session.status=='authenticated'?<>
          <Link href={'/products'}>
          <button className="px-6 py-3  bg-black hover:bg-fuchsia-600 rounded-2xl text-white">Shop Now</button>
          </Link>
      </>:<>
      <Link href={'/login'}>
          <button className="px-6 py-3 border bg-black  hover:bg-fuchsia-600 rounded-2xl text-white">Login</button>
        </Link>
          </>
}
        </div>

      </div>
    </div>
  </>;
}



