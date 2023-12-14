import { Workshop, testingWorkshopData } from "@/constants";
import Image from "next/image";

import {
  HiArrowLongRight,
  HiOutlineCalendar,
  HiOutlineMapPin,
  HiOutlineUsers,
} from 'react-icons/hi2'

import Link from "next/link";

import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

interface Props {}

function WorkshopCard() {

  return(
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 w-full gap-4 pt-6">
      {
        testingWorkshopData.map((item: Workshop, index: number) => (
          <div key={index + item.title} className="relative bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-300/40 h-fit">
            <div className="absolute flex flex-row top-4 left-4 gap-2">
              <div className="bg-yellow-400 px-2 py-1.5 rounded-lg shadow-md">
                <p className="text-gray-800 text-xs">{item.type}</p>
              </div>
              <div className="bg-gray-600 px-2 py-1.5 rounded-lg shadow-md">
                <p className="text-white text-xs">{item.category}</p>
              </div>
            </div>

            <div className="bg-blue-600 flex flext-row items-center gap-4 h-36 px-4 py-4 rounded-t-2xl">
              <div className='absolute top-28 h-14 w-14 border-2 border-white rounded-full shadow-lg shadow-gray-400/30'>
                <Image
                  src={'/assets/detik-logo.png'}
                  fill
                  alt="logo"
                  className='rounded-full object-cover'
                />
              </div>
            </div>
            
            <div className="w-full px-4 h-32 overflow-hidden mt-10">
              <h1 className="text-lg font-bold text-gray-700">{item.title}</h1>
              <p className="text-sm text-gray-600 mt-4 ">
                {item.shortDescription}
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-4 border-y border-gray-200 py-4 px-4">
              <div className="flex flex-row items-center w-full gap-2">
                <HiOutlineCalendar className="h-5 w-5 text-gray-400" />
                <p className="text-xs text-gray-400">{moment(item.date).format('LL')}, {item.startTime} - {item.endTime}</p>
              </div>

              <div className="flex flex-row items-center w-full gap-2">
                <HiOutlineMapPin className="h-5 w-5 text-gray-400" />
                <p className="text-xs text-gray-400">{item.location}</p>
              </div>

              <div className="flex flex-row items-center w-full gap-2">
                <HiOutlineUsers className="h-5 w-5 text-gray-400" />
                <p className="text-xs text-gray-400">{item.quota} Peserta</p>
              </div>
            </div>

            <div className="flex w-full items-end justify-end mt-6 pb-6">
              <Link href={`/workshop/${index}`}>
                <button className="px-4 py-2.5 flex flex-row items-center gap-2">
                  <p className="text-blue-600 text-base">Lihat Detail</p>
                  <HiArrowLongRight className="text-blue-600 h-6 w-6" />
                </button>
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default WorkshopCard;