"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import SubmitButton from "./submit-button"

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 6 characters.",
  }),
})
export function OtpForm({
  onSubmit, 
  SubmitButtonText,
  isLoading
}:{
  onSubmit :(data:string)=>void,
  SubmitButtonText:string,
  isLoading?:boolean,
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

 const  handleSubmit= async(data: z.infer<typeof FormSchema>)=> {
    toast.loading('please wait')
    await onSubmit(data.pin);
    toast.dismiss();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 p-1 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup className=" w-full max-w-xl flex items-center ">
                    <InputOTPSlot index={0}  className="flex-1"/>
                    <InputOTPSlot index={1}  className="flex-1"/>
                    <InputOTPSlot index={2}  className="flex-1"/>
                    <InputOTPSlot index={3}  className="flex-1"/>
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isLoading && <SubmitButton text={SubmitButtonText}/>}
      </form>
    </Form>
  )
}
