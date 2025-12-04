"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {signIn} from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"


const formSchema = z.object({
  email: z.string()
    .nonempty("Email is required")
    .email("Invalid email format"),

  password: z.string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password must contain 8 chars, upper, lower, number, special char"
    )
})

type FormField = z.infer<typeof formSchema>

export function LoginForm() {
    const [isLoading,setIsLoading]=useState<boolean>(false)
    let searchParams=useSearchParams();
    const callbackUrl=searchParams.get('callback-url')



  const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

 async function onSubmit(values: FormField) {
    setIsLoading(true)
   const response= await signIn('credentials',{
    callbackUrl: callbackUrl??'/',
    redirect:true,
    email:values.email,
    password:values.password
   });
   setIsLoading(false)
   console.log(response)
  }

  return (
   <Card className="p-9 w-sm">
 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="cursor-pointer w-full"> {isLoading && <Loader2 className="animate-spin"/> }  Submit</Button>
      </form>
    </Form>



   </Card>
  )
}
