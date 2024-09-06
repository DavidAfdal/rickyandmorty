"use client"


import { CheckStatus } from '@/lib/check-characters'
import { GetLocationFromLocalStorage } from '@/lib/location-characters'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'




function LocationPage() {
  const data = GetLocationFromLocalStorage()
  const [locationNow, setLocationNow] = useState<string>(data.length > 0 ? data[0].title : '');
  
  if (data.length === 0) {
    return <div>No data available</div>;
  }

 

     const getData = (title: string) => {
        return data.find((location) => location.title === title)
     }

  return (
<section className="min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          {data.map((location, i) => (
            <div
              key={i}
              onClick={() => setLocationNow(location.title)}
              className={cn(`cursor-pointer rounded-full border-2 py-2 px-6`, locationNow === location.title ? "border-blue-700" : "border-white")}
            >
              {location.title}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getData(locationNow)?.characters.map((character, i) => (
            <Link href={`/details/${encodeURIComponent(character.name)}`} key={i}>
              <div className="card bg-neutral-900 shadow-xl cursor-pointer">
                <figure>
                  <Image
                    width={100}
                    height={100}
                    unoptimized
                    className="w-full h-full"
                    src={character.image}
                    alt={character.name}
                  />
                </figure>
                <div className="p-6">
                  <h2 className="text-2xl font-bold">{character.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className={cn("w-3 h-3 rounded-full", `bg-${CheckStatus(character.status)}-500`)}></span>
                    <p>{character.status} - {character.species}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocationPage