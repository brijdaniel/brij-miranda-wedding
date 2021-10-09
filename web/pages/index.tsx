import React from 'react';
import Link from 'next/link';
import { InviteCore } from "../shared/invite-core";

export default function Page() {
  return <div className="hero min-h-screen bg-base-200 bg-gray-200 bg-flowers">
    <div className="relative overflow-y-auto pt-20">
      <InviteCore />      
      <div className="transform text-6xl font-pinyon-script flex flex-col items-center">
        <div className="items-end mt-24">
          <p className="">Details</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-end">
        <div className="font-serif flex flex-col items-center gap-3">
          <p className="">15 Onkaparinga Valley Rd, Verdun SA 5245</p>
          <p className="">Bus transportation will be available, please let us know your preferences in your RSVP!</p>
          <p className="">If you have any questions, or would like recommendations for accomodation, please contact Miranda on 0437090088</p>
          <p className="">Our Wedding is an 18+ event</p>
          <p className="">Thank you for your understanding</p>
        </div>
      </div>
      <div className="mt-10" >
      <p className="text-center">&#8595;&#8595;&#8595; Click the map &#8595;&#8595;&#8595;</p>
        <a href="https://www.google.com/maps/place/Maximilians+Restaurant/@-34.95585,138.619768,11.81z/data=!4m5!3m4!1s0x0:0x3a95c76dc2f4028a!8m2!3d-35.0109219!4d138.7839548">
          <img className="px-10 pb-10" src="/map.JPG"/>
        </a>
      </div>
    </div>
  </div>
}
