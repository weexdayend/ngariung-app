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

interface Props {
  data: any
}

function WorkshopCard({ data }: Props) {
  return(
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 w-full gap-4 pt-6">
      {
        data.map((item: any, index: number) => (
          <div key={index + item.EventName} className="relative bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-300/40 h-fit">
            <div className="absolute flex flex-row top-4 left-4 gap-2 z-50">
              <div className="bg-gray-800 px-2 py-1.5 rounded-lg shadow-md">
                <p className="text-white text-xs">{item.EventType.name}</p>
              </div>
            </div>

            <div className="relative bg-blue-600 flex flex-row items-center gap-4 h-36 rounded-t-2xl overflow-hidden">
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

              {/* Profile picture */}
              <div className='absolute top-28 left-4 h-14 w-14 border-2 border-white rounded-full overflow-hidden'>
                <Image
                  src={'/assets/detik-logo.png'}
                  fill
                  alt="logo"
                  className='rounded-full object-cover h-full w-full'
                />
              </div>
            </div>

            
            <div className="w-full px-4 h-32 overflow-hidden mt-10">
              <h1 className="text-lg font-bold text-gray-700">{item.EventName}</h1>
              <p className="text-sm text-gray-600 mt-4 ">
                {item.EventDesc.desc}
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-4 border-y border-gray-200 py-4 px-4">
              <div className="flex flex-row items-center w-full gap-2">
                <HiOutlineCalendar className="h-5 w-5 text-gray-600" />
                <p className="text-xs text-gray-600">{moment(item.EventDate).format('LL')}, {item.EventTime.EventStart} - {item.EventTime.EventEnd}</p>
              </div>
            </div>

            <div className="flex w-full items-end justify-end mt-6 pb-6">
              <Link href={`/workshop/${item.EventID}`}>
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