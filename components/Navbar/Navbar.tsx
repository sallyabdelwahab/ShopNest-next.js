'use client'
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from 'next/link'
import { Loader2, ShoppingCartIcon, User2Icon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { CartContext } from '../Context/CartContext'
import { signOut, useSession } from 'next-auth/react'




export default function Navbar() {
 const{isLoading,cartData}=useContext(CartContext);
  const session=useSession();
 console.log(session)
return<>
<nav className='py-3 bg-fuchsia-500 text-2xl font-bold shadow sticky top-0'>
<div className="container mx-auto">
<div className="flex items-center justify-between">
    <h1> <Link href={'/'}>ShopNest</Link> </h1>

<NavigationMenu>
  <NavigationMenuList>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
<div className="flex items-center ">
{session.status=='authenticated'&&<h2 className='font-light text-sm me-2'> Hi {session.data?.user.name}</h2>}
<DropdownMenu>
  <DropdownMenuTrigger className='outline-0'><User2Icon/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {session.status=='authenticated'?<>
     <Link href={'/profile'}>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    </Link>
    <DropdownMenuSeparator />
    <Link href={'/allorders'}>
    <DropdownMenuItem>AllOrders</DropdownMenuItem>
    </Link>
    <DropdownMenuSeparator />
    <Link href={'/wish'}>
    <DropdownMenuItem>MyFavorite</DropdownMenuItem>
    </Link>
     <DropdownMenuSeparator />
    <Link href={'/logout'}>
    <DropdownMenuItem onClick={()=> signOut({
     callbackUrl:'/'
    })}>LogOut</DropdownMenuItem>
    </Link>
    
    </>:<>
    
    <DropdownMenuSeparator />
    <Link href={'/login'}>
    <DropdownMenuItem>Login</DropdownMenuItem>
    </Link>
    <DropdownMenuSeparator />
    <Link href={'/register'}>
    <DropdownMenuItem>Register</DropdownMenuItem>
    </Link>
    
    
    </>
    
  
  }
   
    
   
     
    
  </DropdownMenuContent>
</DropdownMenu>

{
  session.status=='authenticated'&& <Link href={'/cart'} className=' relative'>
<ShoppingCartIcon/>
 {isLoading?<Loader2 className=' animate-spin size-4  absolute -top-3  -end-3 '/>:<Badge className="size-4 pb-1.5 pt-1 px-0.5    rounded-full   absolute -top-3  -end-2">
         <span>{cartData?.numOfCartItems}</span>
        </Badge>}
</Link>
}










</div>









</div>






</div>


</nav>

</>


}
