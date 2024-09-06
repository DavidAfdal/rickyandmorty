export interface Character {
    id: string;
    name: string;
    status: string;
    image: string;
    species: string;
    type: string;
    gender:string;
    episode: Episode[]
  }


  export interface Episode {
    name: string;
  }
  
  export interface CharacterDatas {
    characters: {
      results: Character[];
    };
  }
  export interface CharacterData {
    characters: {
      results: Character;
    };
  }