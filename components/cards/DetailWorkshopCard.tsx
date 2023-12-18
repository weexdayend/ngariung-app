"use client"

import * as z from "zod";
import React, { useEffect, useState } from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from 'axios';
import Image from "next/image";

import {
  HiArrowLongRight,
  HiMinusCircle,
  HiOutlineCheck,
  HiOutlineCheckCircle,
  HiOutlineMapPin,
  HiOutlineMinusCircle,
  HiOutlineUsers,
} from 'react-icons/hi2'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Terminal } from "lucide-react";

import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

import { useRouter } from 'next/navigation';
import { WorkshopValidation } from '@/lib/validations/user';

import CheckpointCard from "./CheckpointCard";
import CertinfoCard from "./CertinfoCard";

interface Props {
    params: any
    userInfo: any
}
const DetailWorkshopCard = ({ params, userInfo }: Props) => {

  const router = useRouter()

  const [workshop, setWorkshop] = useState<any>([])
  const [participation, setParticipation] = useState<any>([])
  const [stage, setStage] = useState<any>([])
  const [total, setTotal] = useState<any>(0)
  const [cert, setCert] = useState<any>(0)

  const [update, setUpdate] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const fetchWorkshop = async() => {
    try {
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/get-event-id', { EventID: params.id })
      const response = hit.data

      if (hit.status === 200 || hit.status === 201) {
        return response.data
      } else {
        // router.push('/workshop')
        return false
      }
    } catch (error) {
      // router.push('/workshop')
      return false
    }
  }

  const fetchParticipations = async() => {
    try {
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/get-participant-id', { EventID: params.id, UserID: userInfo.id })
      const response = hit.data

      if (hit.status === 200 || hit.status === 201) {
        return response.data
      } else {
        // router.push('/workshop')
        return false
      }
    } catch (error) {
      // router.push('/workshop')
      return false
    }
  }

  const fetchStage = async() => {
    try {
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/get-stage-id', { EventID: params.id, UserID: userInfo.id })
      const response = hit.data

      if (hit.status === 200 || hit.status === 201) {
        return response.data
      } else {
        // router.push('/workshop')
        return false
      }
    } catch (error) {
      // router.push('/workshop')
      return false
    }
  }

  const fetchTotalParticipant = async() => {
    try {
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/get-participant', { EventID: params.id })
      const response = hit.data

      if (hit.status === 200 || hit.status === 201) {
        return response.data
      } else {
        // router.push('/workshop')
        return false
      }
    } catch (error) {
      // router.push('/workshop')
      return false
    }
  }

  const fetchCheckCertificate = async() => {
    try {
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/get-certificate-id', { EventID: params.id, UserID: userInfo.id })
      const response = hit.data

      if (hit.status === 200 || hit.status === 201) {
        return response.data
      } else {
        // router.push('/workshop')
        return false
      }
    } catch (error) {
      // router.push('/workshop')
      return false
    }
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const [
          workshopData,
          participationData,
          stageData,
          totalParticipant,
          certificateData,
        ] = await Promise.all([
          fetchWorkshop(),
          fetchParticipations(),
          fetchStage(),
          fetchTotalParticipant(),
          fetchCheckCertificate(),
        ]);

        setWorkshop(workshopData);
        setParticipation(participationData);
        setStage(stageData);
        setTotal(totalParticipant);
        setCert(certificateData);
      } catch (error) {
        console.log(error);
      } finally {
        setUpdate(false);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          workshopData,
          participationData,
          stageData,
          totalParticipant,
          certificateData,
        ] = await Promise.all([
          fetchWorkshop(),
          fetchParticipations(),
          fetchStage(),
          fetchTotalParticipant(),
          fetchCheckCertificate(),
        ]);

        setWorkshop(workshopData);
        setParticipation(participationData);
        setStage(stageData);
        setTotal(totalParticipant);
        setCert(certificateData);
      } catch (error) {
        console.log(error);
      } finally {
        setUpdate(false);
        setLoading(false);
      }
    };

    if (update) {
      fetchData();
    }
  }, [update]);
  
  const form = useForm<z.infer<typeof WorkshopValidation>>({
    resolver: zodResolver(WorkshopValidation),
    defaultValues: {
      password: "", // Set the initial value for the password field
    },
  });
  
  const onSubmit = async (values: z.infer<typeof WorkshopValidation>) => {
    try {
      setLoading(true); // Set loading to true before making the request
  
      await axios.post('https://sakapulse.vercel.app/api/ngariung/book-event', {
        EventID: params.id,
        UserID: userInfo.id,
        EventPassword: values.password,
      });
  
      // Assuming the request was successful, set loading to false and trigger data update
      setLoading(false);
      setUpdate(true);
    } catch (error: any) {
      setLoading(false); // Set loading to false in case of an error
  
      if (error.response && error.response.status === 401) {
        setMessage('Password yang kamu masukkan salah.');
      } else {
        setMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (!workshop && !participation && !stage) {
      router.push('/workshop')
    }
  }, [workshop, participation, stage])


  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  const originalText = 'Just a second please....';

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText(originalText.substring(0, index));
      setIndex((prevIndex) => (prevIndex + 1 > originalText.length ? 0 : prevIndex + 1));
    }, 100);

    return () => clearInterval(intervalId);
  }, [index, originalText]);

  return (
    <article className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 w-full">
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
          <>
            {
              workshop && workshop.map((item: any, index: number) => (
                <div key={index + item.EventName} className="relative bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-300/40 h-fit">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2 px-4 py-4">
                      <div className='relative h-12 w-12 rounded-full overflow-hidden'>
                        <Image
                          src={'/assets/detik-logo.jpeg'}
                          fill
                          alt="logo"
                          className='rounded-full object-cover'
                        />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-sm text-gray-700">{item.Businesses.BusinessName}</h1>
                        <h1 className="text-xs text-gray-700/50">{item.Businesses.BusinessEmail}</h1>
                      </div>
                    </div>
                    <div className="flex flex-row items-center w-full gap-2 border-t border-gray-200 px-4 py-4">
                      <HiOutlineMapPin className="h-4 w-4 text-gray-700" />
                      <p className="text-xs text-gray-700">{item.EventDesc.venue}</p>
                    </div>
                  </div>
                  <div className="relative bg-blue-600 flex flex-row items-center gap-4 h-96 md:h-96 lg:h-[200vh] overflow-hidden">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0">
                      {
                        item.EventImage.length > 0 ? (
                          <Image
                            src={`${item.EventImage[0].base64}`}
                            alt="cover"
                            fill
                            className="object-cover h-full w-full"
                          />
                        ) : (
                          <></>
                        )
                      }
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
                    </div>
                  </div>
    
                  <div className="flex flex-col gap-2 px-4 py-4 border-b border-gray-200">
                    <div className="flex flex-row items-center w-full gap-2">
                      <p className="text-xs text-gray-700">{moment(item.EventDate).format('LL')}, {item.EventTime.EventStart} - {item.EventTime.EventEnd}</p>
                    </div>
                    <div className="flex flex-row items-center w-full gap-2">
                      <p className="text-xs text-gray-700"><span className="font-bold">{total}</span>/{item.EventMaxUser} Peserta</p>
                    </div>
                  </div>
                  
                  <div className="w-full px-4 h-fit overflow-hidden py-6">
                    <h1 className="text-base font-bold mb-6">{item.EventName}</h1>
                    <p className="text-sm text-gray-600">{item.EventDesc.desc}</p>
                  </div>
    
                  <div className="w-full flex flex-col px-4 h-fit overflow-hidden py-6 gap-4 border-y border-gray-200">
                    {
                      item.EventRundown.map((rundown: any) => (
                        <div key={rundown.index} className="flex flex-col">
                          <p className="text-xs text-gray-600 font-bold">{rundown.highlight}</p>
                          <p className="text-xs text-gray-600">{rundown.speaker}</p>
                        </div>
                      ))
                    }
                  </div>
    
                  <section className="flex flex-col w-full">
                    {
                      participation.length > 0 && (
                        <>
                          {
                            stage.map((item: any, index: number) => (
                              <div key={index} className={`w-full flex flex-row items-center gap-2 border-b border-gray-200 px-4 py-4`}>
                                {
                                  item.EventStageStatus === 1 ? (
                                    <HiOutlineCheckCircle className={`w-5 h-5 text-indigo-600`} />
                                  ) : (
                                    <HiOutlineMinusCircle className={`w-5 h-5 text-gray-200`} />
                                  )
                                }
                                <p className={`text-xs ${item.EventStageStatus === 1 ? 'text-indigo-600' : 'text-gray-200'}`}>{item.EventStages.EventStageName}</p>
                              </div>
                            ))
                          }
                          {stage.some((item: any) => item.EventStageStatus !== 1) ? (
                              <CheckpointCard params={params} userInfo={userInfo} />
                            ) : (
                              <>
                              {
                                cert < 1 ? (<CertinfoCard params={params} userInfo={userInfo} />) : (
                                  <div className="flex w-full flex-col items-center justify-center mt-10 px-12">
                                    <p className="text-base text-indigo-600 font-bold text-center">Terima kasih telah mengikut seminar kami.</p>
                                    <p className="text-xs text-gray-800 text-center">Untuk sertifikat nya, silahkan cek di email yang kamu daftarkan ya.</p>
                                  </div>
                                )
                              }
                              </>
                            )
                          }
                        </>
                      )
                    }
                  </section>
    
                  <div className="flex w-full items-end justify-end mt-6 pb-6">
                  {
                    participation.length > 0 ? (
                      <></>
                    ) : (
                      <>
                        {
                          item.EventType.name === 'Private' ? (
                          <>
                          <Form {...form}>
                            <form
                              className='flex flex-row items-start px-4 gap-4'
                              onSubmit={form.handleSubmit(onSubmit)}
                            >
                            <FormField
                              control={form.control}
                              name='password'
                              render={({ field }) => (
                                <FormItem className='flex w-full flex-col gap-3'>
                                  <FormControl>
                                    <Input
                                      type='text'
                                      placeholder="Password"
                                      className='account-form_input no-focus'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <button type="submit" className="px-4 py-2.5 flex flex-row items-center gap-2 bg-gradient-to-t from-purple-500 to-indigo-600 rounded-lg">
                              <p className="text-white text-sm">Gabung</p>
                            </button>
                            </form>
                          </Form>
                          </>
                          ) : (
                          <>
                            <button className="px-4 py-2.5 flex flex-row items-center gap-2">
                              <p className="text-blue-600 text-base">Participate</p>
                              <HiArrowLongRight className="text-blue-600 h-6 w-6" />
                            </button>
                          </>
                          )
                        }
                      </>
                    )
                  }
                  </div>
                </div>
              ))
            }
          </>
        )
      }
    </article>
  )
}

export default DetailWorkshopCard