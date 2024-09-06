
import { getClient } from "@/lib/apollo-client"
import { gql } from "@apollo/client";
import { CheckStatus } from "@/lib/check-characters"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import {  CharacterDatas } from "@/types/character";


const query = gql`query {
 characters {
   results {
      name
      status
      image
      species
}
  }
}
`;

export default async function ListCharacters() {
    const { data } = await getClient().query<CharacterDatas>({ query: query });
  
  // Destructure characters from data
  const characters = data.characters.results;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {characters.map((data) => (
                 <Link href={`/details/${ encodeURIComponent(data.name)}`} key={data.id}>
                 <div className="card bg-neutral-900 shadow-xl cursor-pointer" >
                 <figure>
                     <Image
                     width={100}
                     height={100}
                     unoptimized
                     className="w-full h-full"
                     src={data.image}
                     alt="Album" />
                 </figure>
                 <div className="p-6">
                     <h2 className="text-2xl font-bold">{data.name}</h2>
                    <div className="flex items-center gap-2">
                        <span className={cn("w-3 h-3 rounded-full", `bg-${CheckStatus(data.status)}-500`)}></span>
                        <p>{data.status} - {data.species}</p>
                    </div>
                 </div>
                 </div>
                 </Link>
            ) )}
           
        </div>
    )
}