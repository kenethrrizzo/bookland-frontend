export interface IBook {
    id: number;
    name: string;
    author: string;
    genres: string[];
    coverpage: string;
    synopsis: string;
    price: number;
}

export interface IUpdateBook {
    name?: string | undefined | null;
    synopsis?: string | undefined | null;
    price?: number | undefined | null;
}