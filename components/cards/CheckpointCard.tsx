"use client"

import * as z from "zod";
import React, { useState } from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckPointValidation } from '@/lib/validations/user';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Props {
  params: any
  userInfo: any
}

const CheckpointCard = ({ params, userInfo }: Props) => {

  const [update, setUpdate] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('')
  
  const form = useForm<z.infer<typeof CheckPointValidation>>({
    resolver: zodResolver(CheckPointValidation),
    defaultValues: {
      token: "", // Set the initial value for the password field
    },
  });

  const onSubmit = async (values: z.infer<typeof CheckPointValidation>) => {
    try {
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/attend-workshop', {
        EventID: params.id,
        UserID: userInfo.id,
        Token: values.token
      });
  
      if (hit.status === 200 || hit.status === 201) {
        window.location.reload()
      } else {
        setMessage('Password yang kamu masukkan salah.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setMessage('Password yang kamu masukkan salah.');
      } else {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="px-4 py-6">
      <Form {...form}>
        <form
          className='flex flex-row items-start px-4 gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
        <FormField
          control={form.control}
          name='token'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl>
                <Input
                  type='text'
                  placeholder="Token"
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="px-4 py-2.5 flex flex-row items-center gap-2 bg-gradient-to-t from-purple-500 to-indigo-600 rounded-lg">
          <p className="text-white text-sm">Attend</p>
        </button>
        </form>
      </Form>
    </div>
  )
}

export default CheckpointCard