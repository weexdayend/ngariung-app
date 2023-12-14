"use client";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants";

import {
  HiOutlinePower
} from 'react-icons/hi2'

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex flex-row items-center justify-start px-4 py-4 rounded-xl gap-2 ${isActive && "bg-gradient-to-t from-purple-500 to-indigo-600 "}`}
            >
              <link.imgURL className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500/70'}`} />
              <p className={`text-sm max-lg:hidden ${isActive ? 'text-white' : 'text-gray-500/70'}`}>{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className='flex flex-row items-center justify-start cursor-pointer gap-2 p-4'>
              {/* <Image
                src='/assets/logout.svg'
                alt='logout'
                width={18}
                height={18}
              /> */}
              <HiOutlinePower className="h-5 w-5 text-red-500" />

              <p className='text-gray-800 text-sm max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;