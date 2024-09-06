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
    // Check if location with the same title already exists (case insensitive)
    const locationIndex = locations.findIndex(
      (loc) => loc.title.toLowerCase() === data.title.toLowerCase()
    );
  
    if (locationIndex !== -1) {
      // Location exists, update characters
      const existingLocation = locations[locationIndex];
  
      // Check if the character ID is already present
      if (existingLocation.characters.includes(data.character)) {
        console.log('Character ID already exists in the location.');
      } else {
        existingLocation.characters.push(data.character);
        // Save updated locations to local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('location', JSON.stringify(locations));
        }
      }
    } else {
      // Location does not exist, add new
      const newLocation: Location = {
        id: Date.now(), // Unique ID for simplicity
        title: data.title,
        characters: [data.character], // Initialize with the single character ID
      };
      locations.push(newLocation);
      // Save updated locations to local storage
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

  // Find the location where the character name matches
  const location = locations.find(loc =>
    loc.characters.some(character => character.name === characterName)
  );

 

  // Return the title of the found location or an empty string if not found
  return location ? location.title : "";
  };


