"use client"

import { usePathname } from "next/navigation";
import { OrganizationSwitcher, SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Image from "next/image";
import Link from "next/link";

import { HiOutlineUser, HiPower } from "react-icons/hi2";

function Topbar() {
  const pathname = usePathname();

  const { userId } = useAuth();

  const isActive =
    (pathname.includes(`/profile/${userId}`)) ||
    pathname === `/profile/${userId}`;
    
  return (
    <nav className='topbar bg-white shadow-xl shadow-blue-300/20 z-20'>
      <Link href='/' className='flex items-center gap-2'>
        <Image src='/assets/logo.svg' alt='logo' width={32} height={32} />
        <p className='text-2xl text-gray-700 font-bold max-xs:hidden'>Ngariung</p>
      </Link>

      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <HiPower className={`h-5 w-5 text-gray-500/70`} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <Link
          href={`/profile/${userId}`}
          key={'Profile'}
          className={`flex flex-row items-center justify-start px-4 py-4 rounded-xl gap-2 ${isActive && "bg-gradient-to-t from-purple-500 to-indigo-600 "}`}
        >
          <HiOutlineUser className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500/70'}`} />
          <p className={`text-sm max-lg:hidden ${isActive ? 'text-white' : 'text-gray-500/70'}`}>Profile</p>
        </Link>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;