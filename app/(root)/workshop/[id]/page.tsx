"use client"

import React from 'react'
import Image from "next/image";

import { HiOutlineCalendar, HiOutlineMap, HiOutlineUsers } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

const Page = () => {

  const pathname = usePathname();
  const { userId } = useAuth();

  const isActive =
    (pathname.includes(`/workshop/1`)) ||
    pathname === `/workshop/1`;
    
  return (
    <div className="w-full h-fit border border-gray-200 shadow-lg shadow-gray-300/40 rounded-3xl">
      <div className="flex w-full h-96 bg-blue-600 rounded-t-3xl" />
      <div className="relative -top-12 w-full px-14 pt-20 py-4 bg-white rounded-3xl flex flex-row items-center gap-4">
        <div className='relative h-20 w-20 border-2 rounded-full'>
          <Image
            src={'/assets/detik-logo.png'}
            fill
            alt="logo"
            className='rounded-full object-cover'
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-start gap-2">
            <HiOutlineCalendar className="text-gray-600 h-5 w-5" />
            <p className="text-xs text-gray-600">15 Mei 2022, 09:00 - 17:00</p>
          </div>
          <h1 className="text-xl font-bold text-gray-700">Cianjur Gempur Hoaks di Era AI</h1>
        </div>
      </div>
      
      <div className="relative -top-8 w-full px-14 pb-6">
        {
          isActive ? (
            <div className="flex flex-row gap-4 items-center justify-between px-2 py-2 rounded-2xl bg-yellow-400">
              <div className="px-4">
                <p className="text-xs text-gray-800">Kamu telah menyelesaikan seminar dan kuis yang ada, silahkan untuk download sertifikat yang sudah kami sediakan!</p>
              </div>
              <button className="px-4 py-2 text-sm bg-gray-800 text-white rounded-xl">Download</button>
            </div>
          ) : (
            <div className="flex flex-row gap-4 items-center justify-between px-2 py-2 rounded-2xl bg-blue-100">
              <div className="px-4">
                <p className="text-xs text-gray-800">Booking seat kamu untuk mengikuti seminar ini, dan ikuti seluruh rangkaian kegiatan seminar dan download sertifikat-nya!</p>
              </div>
              <button className="px-4 py-2 text-sm bg-gray-800 text-white rounded-xl">Booking</button>
            </div>
          )
        }
        <p className="text-sm text-gray-600 mt-4 ">
          Artificial Intelligence (AI) is a revolutionary field of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. The goal of AI is to develop machines that can mimic human cognitive functions, such as learning, problem-solving, perception, and language understanding. Over the years, AI has evolved, and its applications span across various domains, profoundly impacting industries, research, and everyday life.
          <br /><br />
          One of the fundamental concepts in AI is machine learning, a subset of AI that involves building systems capable of learning from data. Machine learning algorithms enable computers to recognize patterns, make predictions, and improve their performance over time without explicit programming. This ability to learn and adapt is what sets AI apart and makes it so powerful.
        </p>

        <div className="flex flex-col w-full gap-6 px-4 py-6 rounded-xl border border-gray-200 mt-10">
          <h1 className="text-lg text-gray-700">Informasi</h1>
          <div className="flex flex-row items-center justify-start gap-2">
            <HiOutlineMap className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-light text-gray-500">Lokasi Seminar di Gedung A.</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <HiOutlineUsers className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-light text-gray-500">45/50 Seat</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-6 px-4 py-6 rounded-xl border border-gray-200 mt-10">
          <h1 className="text-lg text-gray-700">Pemaparan</h1>
          <div className="flex flex-col">
            <div className="flex flex-row items-start justify-start gap-4 border-b border-gray-200 py-4">
              <p className="text-sm text-indigo-600">09:00 - 10:00</p>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
                <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-4 border-b border-gray-200 py-4">
              <p className="text-sm text-indigo-600">09:00 - 10:00</p>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
                <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-4 border-b border-gray-200 py-4">
              <p className="text-sm text-indigo-600">09:00 - 10:00</p>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
                <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-4 border-b border-gray-200 py-4">
              <p className="text-sm text-indigo-600">09:00 - 10:00</p>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
                <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-4 py-4">
              <p className="text-sm text-indigo-600">09:00 - 10:00</p>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-700">Pengenalan AI</p>
                <p className="text-xs font-light text-gray-700">Dwi Sasono</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page