export interface Ipokemonlist {
  name: string;
  url: string;
}

export interface IData {
  data: {
    next: string | null;
    previous: string | null;
    results: Ipokemonlist[];
    count: number;
  };
  status: number;
}

export interface IAbilities {
  ability: {
    name: string;
    url: string;
  };
}

interface IType {
  type: {
    name: string;
  };
}

export interface IDetailData {
  abilities: IAbilities[];
  height: number;
  weight: number;
  img: string;
  types: IType[];
}
