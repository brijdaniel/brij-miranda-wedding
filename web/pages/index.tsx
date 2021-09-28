import React from 'react';
import Link from 'next/link';
import { InviteCore } from "../shared/invite-core"

export default function Page() {
  return <div className="hero min-h-screen bg-base-200 bg-gray-200 bg-flowers">
          <div className="absolute right-0 top-0">
            <Link href="/guests"><a className="btn bg-red-500 opacity-30 m-3">Admin</a></Link>
          </div>
          <div>
            <InviteCore />
          </div>
        </div>
}
