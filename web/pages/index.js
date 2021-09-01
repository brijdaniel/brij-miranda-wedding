import React from 'react';

export default function Page() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Brij {'&'} Miranda's Wedding
          </h1>
          <p className="mb-5">
            This website is to commemorate the sacred union of Brij and Miranda :)
          </p>
          <div className="text-red-600 flex justify-center">
            <svg id="i-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="80" height="80" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

Page.isPublic = true;
