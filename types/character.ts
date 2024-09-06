export interface Character {
    id: string;
    name: string;
    status: string;
    image: string;
    species: string;
    type: string;
    gender:string;
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