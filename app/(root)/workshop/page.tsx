"use client"

import React, { useEffect, useState } from 'react'
import WorkshopCard from '@/components/cards/WorkshopCard'

import axios from 'axios'

const Page = () => {

  const [dataWorkshop, setDataWorkshop] = useState([])

  const fetchWorkshop = async() => {
    const hit = await axios.get('http://localhost:3000/api/ngariung/get-event')
    const response = hit.data

    setDataWorkshop(response.data)
  }

  useEffect(() => {
    fetchWorkshop()
  }, [])

  return (
    <>
      <h1 className="text-3xl text-left font-bold text-gray-700">Workshop</h1>
      
      <WorkshopCard data={dataWorkshop} />
    </>
  )
}

export default Page