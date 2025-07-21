import {useEffect, useState} from "react";
import type {BoardGame} from "../types/boardGame.ts";
import FilterBar from "../components/FilterBar.tsx";
import GameCard from "../components/GameCard.tsx";
import {mockGames} from "../mockGames.ts";
import {Modal} from "../components/modal.tsx";

interface Filters{
    name: string;
    minPlayers: number |null;
    maxPlayers: number |null;
    language: string;
    genres: string[];
}

export default function GameListPage(){
    const [allGames, setAllGames] = useState<BoardGame[]>([]);
    const [filters, setFilters] = useState<Filters>({
        name:'',
        minPlayers:null as number | null,
        maxPlayers:null as number | null,
        language:'',
        genres:[] as string[]});
    const [popupSrc, setPopupSrc] = useState<string | null>(null);

    useEffect(() => {
        //TODO: api call
        setAllGames(mockGames);
    }, []);

    const filtered = allGames.filter(g =>
        (!filters.name || g.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.minPlayers === null || g.maxPlayers >= filters.minPlayers) &&
        (filters.maxPlayers === null || g.minPlayers <= filters.maxPlayers) &&
        (!filters.language || g.language === filters.language) &&
        (filters.genres.length === 0 || filters.genres.every(sel => g.genres.includes(sel)))
    );

    const openModal = (src: string) => setPopupSrc(src);

    return (
        <div className={"p-6"}>
            <FilterBar {...filters} onChange={setFilters}/>
            <table>
                <thead>
                <tr>
                    <th className={"w-32 border border-gray-300 p-1 text-left"}>Box Art Front</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Players</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Language</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Genres</th>
                    <th className={"border border-gray-300 px-4 py-2 text-left"}>Rules</th>
                    <th className="w-24 border border-gray-300 px-4 py-2 text-left">Back</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map(game => <GameCard key={game.id} game={game} onThumbnailClick={openModal}/>)}
                </tbody>
            </table>


            {popupSrc && (
                <Modal onClose={() => setPopupSrc(null)}>
                    <img
                        src={popupSrc}
                        alt="Full Size"
                        className={"max-h-[90vh] max-w-[90vw] select-none"}
                        onClick={() => setPopupSrc(null)}
                    />
                </Modal>
            )}
        </div>
    );
}