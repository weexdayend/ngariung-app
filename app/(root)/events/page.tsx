"use client"

import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Link from 'next/link'

import EventsCard from '@/components/cards/EventsCard'

const Page = () => {

  const [dataWorkshop, setDataWorkshop] = useState([])

  const fetchWorkshop = async() => {
    const hit = await axios.get('https://sakapulse.vercel.app/api/ngariung/get-event')
    const response = hit.data

    setDataWorkshop(response.data)
  }

  useEffect(() => {
    fetchWorkshop()
  }, [])

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="text-3xl text-left font-bold text-gray-700">Events</h1>
        <Link href="/events/certificate">
          <h1 className="text-xs text-right font-bold text-indigo-600 cursor-pointer">Verifikasi Sertifikat</h1>
        </Link>
      </div>
      
      <EventsCard data={dataWorkshop} />
    </>
  )
}

export default Page