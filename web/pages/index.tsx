import React from 'react';
import { InviteCore } from "../shared/invite-core";
import { InviteDetails } from 'shared/invite-details';

export default function Page() {
  return <div className="hero min-h-screen bg-base-200 bg-gray-200 bg-flowers">
    <div className="relative overflow-y-auto pt-20">
      <InviteCore />      
      <InviteDetails />
      <div className="mt-10" >
      <p className="text-center">&#8595;&#8595;&#8595; Click the map &#8595;&#8595;&#8595;</p>
        <a href="https://www.google.com/maps/place/Maximilians+Restaurant/@-34.95585,138.619768,11.81z/data=!4m5!3m4!1s0x0:0x3a95c76dc2f4028a!8m2!3d-35.0109219!4d138.7839548">
          <img className="px-10 pb-10" src="/map.JPG"/>
        </a>
      </div>
    </div>
  </div>
}
