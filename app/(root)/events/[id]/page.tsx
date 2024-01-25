import React from 'react'

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.action";

import DetailEventsCard from '@/components/cards/DetailEventsCard';

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
    
  return (
    <section>
      <DetailEventsCard userInfo={userInfo} params={params} />
    </section>
  )
}

export default Page