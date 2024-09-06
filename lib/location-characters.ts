import { Character } from "@/types/character";

interface Location {
    id: number;
    title: string;
    characters: Character[] ;
  }
  
  export const StoreLocation = (data: { title: string; character: Character }) => {
    const locations = GetLocationFromLocalStorage();

    const isCharacterIdExists = locations.some(location => location.characters.includes(data.character));

    if (isCharacterIdExists) {
      console.log('Character ID already exists in another location.');
      return;
    }
   
    const locationIndex = locations.findIndex(
      (loc) => loc.title.toLowerCase() === data.title.toLowerCase()
    );
  
    if (locationIndex !== -1) {
    
      const existingLocation = locations[locationIndex];
  
      if (existingLocation.characters.includes(data.character)) {
        console.log('Character ID already exists in the location.');
      } else {
        existingLocation.characters.push(data.character);
      
        if (typeof window !== 'undefined') {
          localStorage.setItem('location', JSON.stringify(locations));
        }
      }
    } else {
    
      const newLocation: Location = {
        id: Date.now(), 
        title: data.title,
        characters: [data.character], 
      };
      locations.push(newLocation);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('location', JSON.stringify(locations));
      }
    }
  };
  

export const GetLocationFromLocalStorage = (): Location[] => {
    if (typeof window !== 'undefined') {
      const savedLocations = localStorage.getItem('location');
      if (savedLocations) {
        return JSON.parse(savedLocations) as Location[];
      }
    }
    return [];
};
  

export const GetLocationTitleByCharacterId = (characterName: string): string => {
    const locations = GetLocationFromLocalStorage();

  
  const location = locations.find(loc =>
    loc.characters.some(character => character.name === characterName)
  );

 

  
  return location ? location.title : "";
  };


