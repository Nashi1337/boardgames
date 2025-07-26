export interface Filters {
    name: string;
    minPlayers: number | null;
    maxPlayers: number | null;
    language: string;
    genres: string[];
}
