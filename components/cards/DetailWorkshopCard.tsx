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
  HiOutlineMapPin,
  HiOutlineMinusCircle,
  HiOutlineUsers,
} from 'react-icons/hi2'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

import { useRouter } from 'next/navigation';
import { WorkshopValidation } from '@/lib/validations/user';

import CheckpointCard from "./CheckpointCard";

interface Props {
    params: any
    userInfo: any
}
const DetailWorkshopCard = ({ params, userInfo }: Props) => {

  const router = useRouter()

  const [workshop, setWorkshop] = useState<any>([])
  const [participation, setParticipation] = useState<any>([])
  const [stage, setStage] = useState<any>([])

  const [update, setUpdate] = useState<boolean>(false)

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
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/get-stage-id', { EventID: params.id })
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
    Promise.all([fetchWorkshop(), fetchParticipations(), fetchStage()])
      .then(([workshopData, participationData, stageData]) => {
        setWorkshop(workshopData);
        setParticipation(participationData);
        setStage(stageData)
      })
      .catch((error) => {
        console.log(error)
      }).finally(() => setUpdate(!update));
  }, []);

  useEffect(() => {
    if (update) {
      Promise.all([fetchWorkshop(), fetchParticipations(), fetchStage()])
      .then(([workshopData, participationData, stageData]) => {
        setWorkshop(workshopData);
        setParticipation(participationData);
        setStage(stageData)
      })
      .catch((error) => {
        console.log(error)
      }).finally(() => setUpdate(!update));
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
      const hit = await axios.post('https://sakapulse.vercel.app/api/ngariung/book-event', {
        EventID: params.id,
        UserID: userInfo.id,
        EventPassword: values.password,
      });
  
      if (hit.status === 200 || hit.status === 201) {
        setUpdate(!update)
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

  useEffect(() => {
    if (!workshop && !participation && !stage) {
      router.push('/workshop')
    }
  }, [workshop, participation, stage])

  return (
    <article className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 w-full">
      {
        workshop && workshop.map((item: any, index: number) => (
          <div key={index + item.EventName} className="relative bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-300/40 h-fit">
            
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2 px-4 py-4">
                <div className='relative h-12 w-12 rounded-full overflow-hidden'>
                  <Image
                    src={'/assets/detik-logo.png'}
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
            </div>
            
            <div className="w-full px-4 h-fit overflow-hidden py-6">
              <h1 className="text-base font-bold mb-6">{item.EventName}</h1>
              <p className="text-sm text-gray-600">{item.EventDesc.desc}</p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-4 border-y border-gray-200 py-4 px-4">
              <div className="flex flex-row items-center w-full gap-2">
                <HiOutlineUsers className="h-5 w-5 text-gray-700" />
                <p className="text-xs text-gray-700">{item.EventMaxUser} Seat Peserta</p>
              </div>
            </div>

            <section className="flex flex-col w-full gap-2 border-b border-gray-200">
              {
                participation.length > 0 && (
                  <>
                    {
                      stage.map((item: any, index: number) => (
                        <div key={index} className="w-full flex flex-row items-center gap-2 border-b border-gray-200 px-4 py-4">
                          <HiOutlineMinusCircle className="w-5 h-5 text-gray-200" />
                          <p className="text-xs text-gray-200">{item.EventStageName}</p>
                        </div>
                      ))
                    }
                    <CheckpointCard params={params} userInfo={userInfo} />
                  </>
                )
              }
            </section>

            <div className="flex w-full items-end justify-end mt-6 pb-6">
            {
              participation.length > 0 ? (
                <div className="flex-1 flex-col items-center justify-center px-6">
                  <div className="px-4 py-2.5 flex flex-row items-center justify-center gap-2 rounded-xl">
                    <p className="text-blue-400 text-sm text-center">Sudah Bergabung</p>
                    <HiOutlineCheck className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
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
    </article>
    // <div className="w-full h-fit border border-gray-200 shadow-lg shadow-gray-300/40 rounded-3xl">
    //   {
    //     data && data.map((item: any, index: number) => (
    //       <article key={index}>
    //         <div className="relative w-full px-14 pt-20 py-4 bg-white rounded-3xl flex flex-row items-center justify-between gap-4">
    //           <div className="flex flex-row gap-4 items-center">
    //             <div className='relative h-20 w-20 border-2 rounded-full'>
    //               <Image
    //                 src={'/assets/detik-logo.png'}
    //                 fill
    //                 alt="logo"
    //                 className='rounded-full object-cover'
    //               />
    //             </div>
    //             <div className="flex flex-col gap-2">
    //               <div className="flex flex-row items-center justify-start gap-2">
    //                 <HiOutlineCalendar className="text-gray-600 h-5 w-5" />
    //                 <p className="text-xs text-gray-600">{item.EventDate}, {item.EventTime.EventStart} - {item.EventTime.EventEnd}</p>
    //               </div>
    //               <h1 className="text-xl font-bold text-gray-700">{item.EventName}</h1>
    //             </div>
    //           </div>
    //           <button className="px-4 py-2 text-sm bg-gray-800 text-white rounded-xl">Participate</button>
    //         </div>
            
    //         <div className="w-full px-14 pb-6">
    //           <div className="flex flex-row gap-4 items-center justify-between px-2 py-4 rounded-2xl bg-blue-100 my-6">
    //             <div className="px-4">
    //               <p className="text-xs text-gray-800">Booking seat kamu untuk mengikuti seminar ini, dan ikuti seluruh rangkaian kegiatan seminar dan download sertifikat-nya!</p>
    //             </div>
    //           </div>

    //           <div className='relative h-96 w-96 border-2 rounded-full my-8'>
    //             <Image
    //               src={`${item.EventImage[0].base64}`}
    //               fill
    //               alt="logo"
    //               className='rounded-xl object-cover'
    //             />
    //           </div>

    //           <p className="text-sm text-gray-600 mt-4 ">
    //             {item.EventDesc.desc}
    //           </p>

    //           <div className="flex flex-col w-full gap-6 px-4 py-6 rounded-xl border border-gray-200 mt-10">
    //             <h1 className="text-lg text-gray-700">Informasi</h1>
    //             <div className="flex flex-row items-center justify-start gap-2">
    //               <HiOutlineMap className="h-5 w-5 text-gray-500" />
    //               <p className="text-sm font-light text-gray-500">{item.EventDesc.address} - {item.EventDesc.venue}</p>
    //             </div>
    //             <div className="flex flex-row items-center justify-start gap-2">
    //               <HiOutlineUsers className="h-5 w-5 text-gray-500" />
    //               <p className="text-sm font-light text-gray-500">Max {item.EventMaxUser} Participant</p>
    //             </div>
    //           </div>

    //           <div className="flex flex-col w-full gap-6 px-4 py-6 rounded-xl border border-gray-200 mt-10">
    //             <h1 className="text-lg text-gray-700">Pemaparan</h1>
    //             <div className="flex flex-col">
    //               <div className="flex flex-row items-start justify-start gap-4 border-b border-gray-200 py-4">
    //                 <p className="text-sm text-indigo-600">09:00 - 10:00</p>
    //                 <div className="flex flex-col">
    //                   <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
    //                   <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
    //                 </div>
    //               </div>
    //               <div className="flex flex-row items-start justify-start gap-4 border-b border-gray-200 py-4">
    //                 <p className="text-sm text-indigo-600">09:00 - 10:00</p>
    //                 <div className="flex flex-col">
    //                   <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
    //                   <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
    //                 </div>
    //               </div>
    //               <div className="flex flex-row items-start justify-start gap-4 border-b border-gray-200 py-4">
    //                 <p className="text-sm text-indigo-600">09:00 - 10:00</p>
    //                 <div className="flex flex-col">
    //                   <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
    //                   <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
    //                 </div>
    //               </div>
    //               <div className="flex flex-row items-start justify-start gap-4 border-b border-gray-200 py-4">
    //                 <p className="text-sm text-indigo-600">09:00 - 10:00</p>
    //                 <div className="flex flex-col">
    //                   <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
    //                   <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
    //                 </div>
    //               </div>
    //               <div className="flex flex-row items-start justify-start gap-4 py-4">
    //                 <p className="text-sm text-indigo-600">09:00 - 10:00</p>
    //                 <div className="flex flex-col">
    //                   <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
    //                   <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </article>
    //     ))
    //   }
    // </div>
  )
}

export default DetailWorkshopCard