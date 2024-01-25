import Image from "next/image";

import {
  HiArrowLongRight,
  HiOutlineCalendar,
} from 'react-icons/hi2'

import Link from "next/link";

import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

interface Props {
  data: any
}

function EventsCard({ data }: Props) {
  return(
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 w-full gap-4 pt-6">
      {
        data.map((item: any, index: number) => (
          <div key={index + item.EventName} className="relative bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-300/40 h-fit">
            <div className="relative bg-blue-600 flex flex-row items-center gap-4 h-52 rounded-t-2xl overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              </div>



              <div className="absolute top-4 left-0 w-full flex flex-col gap-2 px-4 h-24 overflow-hidden">
                <div className="flex flex-row top-4 right-4 gap-2 z-10">
                  <div className="bg-gray-800 px-2 py-1.5 rounded-xl shadow-md">
                    <p className="text-white text-xs">{item.EventType.name}</p>
                  </div>

                  <div className={`${item.EventStatus === true ? 'bg-indigo-600' : 'bg-red-600'} px-2 py-1.5 rounded-xl shadow-md`}>
                    <p className="text-white text-xs">{item.EventStatus === true ? 'Open' : 'Closed'}</p>
                  </div>
                </div>
                <h1 className="flex text-lg font-bold text-white">{item.EventName}</h1>
              </div>
            </div>

            <div className="w-full px-4 h-32 overflow-hidden py-4">
              <p className="text-gray-400 text-xs">
                {item.EventStatus === true ? 'Event akan segera dimulai.' : 'Event sudah selesai.'}
              </p>
              <p className="text-sm text-gray-600 mt-4 overflow-hidden line-clamp-3">
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
              <Link href={`/events/${item.EventID}`}>
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

export default EventsCard;