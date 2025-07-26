export interface BoardGame{
    id: string;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    language: string;
    genres: string[];
    boxImageFrontUrl: string;
    boxImageBackUrl: string;
    rulesPdfUrl?: string;
    score?: number;
    bggUrl?: string;
}