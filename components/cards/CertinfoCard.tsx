"use client"

import * as z from "zod";
import React, { useEffect, useState } from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CertificateValidation } from '@/lib/validations/user';

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


const generateBeautifulSerial = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month with leading zero
  const day = date.getDate().toString().padStart(2, '0'); // Day with leading zero
  const minutes = date.getHours().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const miliseconds = date.getMilliseconds().toString().padStart(2, '0');

  // Generate a random alphanumeric string
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();

  const serialNumber = `CERT-DTKJBR-${year}${month}${day}-${minutes}${seconds}${miliseconds}-${randomString}`;
  return serialNumber;
};

const CertinfoCard = ({ params, userInfo }: Props) => {

  const [update, setUpdate] = useState<boolean>(false)
  const [serial, setSerial] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  
  useEffect(() => {
    const generate = generateBeautifulSerial()
    setSerial(generate)
  }, [])
  
  const form = useForm<z.infer<typeof CertificateValidation>>({
    resolver: zodResolver(CertificateValidation),
    defaultValues: {
      name: "", // Set the initial value for the password field
      email: "",
      phone: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof CertificateValidation>) => {
    try {
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/generate-certificate', {
        EventID: params.id,
        UserID: userInfo.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        serial: serial,
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
      <p className="text-gray-700 text-sm">Karena kebutuhan sertifikat dan agar tidak ada misinformasi, isi kembali data data diri kamu ya.</p>
      <Form {...form}>
        <form
          className='flex flex-col items-start gap-4 mt-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl>
                <Input
                  type='text'
                  placeholder="Nama Lengkap"
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl>
                <Input
                  type='email'
                  placeholder="email@kamu.com"
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormControl>
                <Input
                  type='tel'
                  placeholder="0812xxxxxx"
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="px-4 py-2.5 flex w-full text-center flex-row items-center gap-2 bg-gradient-to-t from-purple-500 to-indigo-600 rounded-lg">
          <p className="text-white text-sm text-center w-full">Kirim</p>
        </button>
        </form>
      </Form>
    </div>
  )
}

export default CertinfoCard