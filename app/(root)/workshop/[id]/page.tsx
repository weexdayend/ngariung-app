import React from 'react'

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.action";

import DetailWorkshopCard from '@/components/cards/DetailWorkshopCard';

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
    
  return (
    <section>
      <DetailWorkshopCard userInfo={userInfo} params={params} />
    </section>
  )
}

export default Page