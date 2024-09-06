import ListCharacters from "./_components/list-characters";


export default function Home() {
  return (
      <section>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">List Characters Ricky and Morty</h1>
        <p className="md:text-lg lg:max-w-[85%] text-neutral-400 text-justify mb-4">{`Here is a list of characters from the popular animated series "Rick and Morty". Discover interesting details about each unique character.`}</p>
        <ListCharacters/>
      </section>
  );
}
