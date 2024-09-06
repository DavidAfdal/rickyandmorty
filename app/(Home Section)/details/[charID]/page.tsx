"use client";

import Modal from "@/components/modal";
import { CheckStatus } from "@/lib/check-characters";
import { GetLocationTitleByCharacterId, StoreLocation } from "@/lib/location-characters";
import { cn } from "@/lib/utils";
import { Character, CharacterDatas } from "@/types/character";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";

interface DetailPageProps {
  params: {
    charID: string;
  };
}

const QUERY = gql`
  query GetCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        status
        image
        species
        gender
        type
      }
    }
  }
`;

export default function DetailPage({ params }: DetailPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, error, data } = useQuery<CharacterDatas>(QUERY, {
    variables: { name: decodeURIComponent(params.charID) },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const character = data?.characters.results[0];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Character = {
      id: character?.id ?? '',
      name: character?.name ?? '',
      status: character?.status ?? '',
      image: character?.image ?? '',
      species: character?.species ?? '',
      gender: character?.gender ?? '',
      type: character?.type ?? '',
    };
    StoreLocation({
      title: formData.get('title') as string,
      character: data,
    });
    closeModal();
  };

  return (
    <>
      <div className="lg:max-w-[75%] mx-auto min-h-screen sm:flex flex-col justify-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Detail Characters</h1>
          <div className="card sm:card-side bg-neutral-900 shadow-xl cursor-pointer">
            <figure>
              <Image
                width={100}
                height={100}
                unoptimized
                className="w-full h-full"
                src={character?.image ?? ''}
                alt="Character Image"
              />
            </figure>
            <div className="p-6 flex flex-col gap-4 card-body">
              <div className="flex flex-col gap-2">
                <h2 className="md:text-4xl font-bold">{character?.name ?? 'Unknown'}</h2>
                <div className="flex items-center gap-2">
                  <span className={cn("w-3 h-3 rounded-full", CheckStatus(character?.status ?? ''))}></span>
                  <p>{character?.status ?? 'Unknown'} - {character?.species ?? 'Unknown'}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-neutral-400">Type :</p>
                <p>{character?.type !== "" ? character?.type : "Unknown"}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-neutral-400">Gender :</p>
                <p>{character?.gender ?? 'Unknown'}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-neutral-400">First seen in :</p>
                <p>Close Rick-counters of the Rick Kind</p>
              </div>
              {GetLocationTitleByCharacterId(decodeURIComponent(params.charID)) !== "" ? (
                <div className="flex flex-col">
                  <p className="text-neutral-400">Location :</p>
                  <p>{GetLocationTitleByCharacterId(decodeURIComponent(params.charID))}</p>
                </div>
              ) : null}
              {GetLocationTitleByCharacterId(decodeURIComponent(params.charID)) === "" ? (
                <div className="flex justify-end">
                  <button className="btn btn-primary text-white" onClick={openModal}>Assign Location</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Assign Character Location">
        <form className="w-full" onSubmit={handleSubmit}>
          <input type="text" placeholder="Input Character Location" className="w-full p-2 rounded-md" id="title" name="title" />
          <button type="submit" className="btn mt-4">Assign Character Location</button>
        </form>
      </Modal>
    </>
  );
}
