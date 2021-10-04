import React from 'react';
import Link from 'next/link';
import { InviteCore } from "../shared/invite-core";

export default function Page() {
  return <div className="hero min-h-screen bg-base-200 bg-gray-200 bg-flowers">
    <div className="absolute right-0 top-0">
      <Link href="/guests"><a className="btn bg-red-500 opacity-30 m-3">Admin</a></Link>
    </div>
    <div className="relative overflow-y-auto pt-20">
      <InviteCore />      
      <div className="transform text-6xl font-pinyon-script flex flex-col items-center">
        <div className="items-end mt-24">
          <p className="">Details</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-end">
        <div className="font-serif flex flex-col items-start mr-12 gap-3">
          <p className="">15 Onkaparinga Valley Rd, Verdun SA 5245</p>
          <p className="">Our Wedding is an 18+ event</p>
          <p className="">Thank you for your understanding</p>
        </div>
      </div>
      <div className="mt-10" >
        <a href="https://www.google.com/maps/place/Maximilians+Restaurant/@-34.95585,138.619768,11.81z/data=!4m5!3m4!1s0x0:0x3a95c76dc2f4028a!8m2!3d-35.0109219!4d138.7839548">
          <img className="p-10" src="/map.JPG"/>
        </a>
      </div>
    </div>
  </div>
}
