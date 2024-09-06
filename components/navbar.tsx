import Link from 'next/link'
import React from 'react'
import { FaSearchLocation } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-indigo-800">
        <div className="max-w-screen-xl mx-auto py-4 flex justify-between md:px-4 px-2 items-center">
            <Link href="/"><h1 className="text-md md:text-2xl font-bold">Rick and Morty</h1></Link>
            <Link href="/locations" className='hidden sm:block'>Characters Location</Link>
            <FaSearchLocation className='block sm:hidden w-6 h-6 text-white'/>
        </div>

    </nav>
  )
}

export default Navbar