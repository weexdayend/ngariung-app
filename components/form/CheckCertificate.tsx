"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { CertificateValidation, ThreadValidation } from "@/lib/validations/thread";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { HiCheckBadge } from "react-icons/hi2";

interface Props {}

function CheckCertificate({}: Props) {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [verified, setVerified] = useState<[] | null>(null)

  const form = useForm<z.infer<typeof CertificateValidation>>({
    resolver: zodResolver(CertificateValidation),
    defaultValues: {
      serial: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CertificateValidation>) => {
    try {
      setLoading(true); // Set loading to true before making the request
  
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/check-certificate', {
        serial: values.serial,
      });
      const response = hit.data

      if (hit.status === 500) {
        alert('dong')
      }
      setVerified(response.dataSupa)
    } catch (error: any) {
      setLoading(false); // Set loading to false in case of an error
      setMessage(error.message);
    } finally {
      form.reset()
      setTimeout(() => {
        setLoading(false);
      }, 3000)
    }
  };

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  const originalText = 'Sistem sedang cek serial kamu....';

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText(originalText.substring(0, index));
      setIndex((prevIndex) => (prevIndex + 1 > originalText.length ? 0 : prevIndex + 1));
    }, 100);

    return () => clearInterval(intervalId);
  }, [index, originalText]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <Form {...form}>
        <form
          className='mt-10 flex flex-col gap-6 py-6 border-y border-gray-200'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name='serial'
              render={({ field }) => (
                <FormItem className='flex-1 w-full flex-col gap-3 no-focus ring-0'>
                  <FormControl className='no-focus ring-0 text-gray-700'>
                      <Input
                      type='text'
                      placeholder='Serial sertifikat kamu...'
                      className='account-form_input no-focus'
                      {...field}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="w-full flex flex-row gap-2 items-center justify-end">
            <Button type='submit' className='bg-indigo-600 w-fit rounded-full'>
              Cek Sertifikat
            </Button>
          </div>
        </form>
      </Form>

      {
        loading ? (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Please waiting!</AlertTitle>
            <AlertDescription className="terminal-text">
              <span className="typingAnimation">
                {text}
                <span className="blinkingCursor">|</span>
              </span>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            {verified &&
              verified.length > 0? (
                <AlertDescription className="terminal-text">
                  {
                    verified.map((item: any, index: number) => (
                      <div key={index} className="flex flex-row items-center gap-2 px-4 py-4 rounded-lg bg-green-50">
                        <span key={index} className="text-sm text-green-600">Certificate Verified by <span className="font-semibold">{item.Events.Businesses.BusinessName}</span></span>
                        <HiCheckBadge className="w-5 h-5 text-green-600" />
                      </div>
                    ))
                  }
                </AlertDescription>
              ) : verified && verified.length === 0 ? (
                <>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Sertifikat Tidak Ditemukan! 😔</AlertTitle>
                  <AlertDescription className="terminal-text">
                    <span>Serial sertifikat yang kamu cari tidak berhasil di temukan oleh sistem.</span>
                  </AlertDescription>
                </>
              ) : (
                <>
                  <Terminal className="h-4 w-4" />
                  <AlertDescription className="terminal-text">
                    <span>Untuk memastikan sertifikat yang kamu dapatkan terverifikasi oleh pihak penyelenggara.</span>
                  </AlertDescription>
                </>
              )
            }
          </Alert>
        )
      }
    </div>
  );
}

export default CheckCertificate;