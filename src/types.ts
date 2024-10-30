export interface Character {
  name: string;
  background: string;
}

export interface GenerateRequest {
  character1: Character;
  character2: Character;
}

export interface GenerateResponse {
  story: string;
  avatars: {
    character1: string;
    character2: string;
  };
  cpImage: string;
}