import {useEffect, useMemo, useState} from "react";
import type {BoardGame} from "../types/boardGame.ts";
import {
    Box, Dialog, DialogContent,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {mockGames} from "../mockGames.ts";
import GameRow from "../components/GameRow.tsx";
import type {Filters} from "../types/filters.ts";
import FilterBar from "../components/FilterBar.tsx";

async function fetchBGGStats(gameName: string) {
    const parser = new DOMParser()

    const searchRes = await fetch(
        `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(
            gameName
        )}
            &type=boardgame`
    )
    const searchXml = await searchRes.text()
    const searchDoc = parser.parseFromString(searchXml, 'application/xml')
    const candidates = Array.from(searchDoc.querySelectorAll('item'));
    const exactMatch = candidates.find(item => {
        const primaryNameEl = item.querySelector('name[type="primary"]')
        if (!primaryNameEl) return false
        const val = primaryNameEl.getAttribute('value')
        return val?.toLowerCase() === gameName.toLowerCase()
    })
    const chosenItem = exactMatch ?? candidates[0];
    const gameId = chosenItem.getAttribute('id');
    const thingRes = await fetch(
        `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}&stats=1`
    )
    const thingXml = await thingRes.text()
    const thingDoc = parser.parseFromString(thingXml, 'application/xml')

    const ratingsNode = thingDoc.querySelector(
        'statistics > ratings'
    )
    if (!ratingsNode) throw new Error(`No <ratings> block for ID ${gameId}`)

    const stats: Record<string, string> = {}
    ratingsNode.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element
            const name = el.nodeName
            stats[name] = el.getAttribute('value') ?? ''
        }
    })

    const avg = thingDoc.querySelector('statistics > ratings > average');

    console.log(`BGG ratings for "${gameName}" (ID ${gameId}):`, stats)

    if(!avg) throw new Error(`No <average> rating for ID ${gameId}`)
    const raw = avg.getAttribute('value')!
    const rounded = Number((parseFloat(raw)).toFixed(1));
    const url = `https://boardgamegeek.com/boardgame/${gameId}`;
    return {score: rounded, url};
}

const allLanguages = Array.from(new Set(mockGames.map((g) => g.language)));
const allGenres = Array.from(
    new Set(
        mockGames.flatMap((game) => game.genres)
    )
);

export default function GameListPage(){
    const [allGames, setAllGames] = useState<BoardGame[]>([]);
    const [filters, setFilters] = useState<Filters>({
        name:'',
        minPlayers:null as number | null,
        maxPlayers:null as number | null,
        language:'',
        genres:[]
    });
    const [popupSrc, setPopupSrc] = useState<string | null>(null);

    useEffect(() => {
        //TODO: api call
        setAllGames(mockGames);
    }, []);

    useEffect(() => {
        allGames.forEach((g) => {
            if (g.score == null) {
                fetchBGGStats(g.name)
                    .then(({ score, url }) => {
                        setAllGames((prev) =>
                            prev.map((game) =>
                                game.id === g.id
                                    ? { ...game, score, bggUrl: url }
                                    : game
                            )
                        );
                    })
                    .catch((err) =>
                        console.error("BGG fetch failed for", g.name, err)
                    );
            }
        });
    }, [allGames]);

    const filtered = useMemo(() => {
        return allGames.filter((g) => {
            if(
                filters.name &&
                    !g.name.toLowerCase().includes(filters.name.toLowerCase())
            )
                return false;
            if (
                filters.minPlayers !== null &&
                g.maxPlayers < filters.minPlayers
            )
                return false;
            if(
                filters.maxPlayers !== null &&
                g.minPlayers > filters.maxPlayers
            )
                return false;
            if(filters.language && g.language !== filters.language)
                return false;
            return !(filters.genres.length > 0 &&
                !filters.genres.every((sel) => g.genres.includes(sel)));

        })
    },[allGames,filters]);

    const openModal = (src: string) => setPopupSrc(src);

    return (
        <>
            <FilterBar
                {...filters}
                onChange={setFilters}
                allLanguages={allLanguages}
                allGenres={allGenres}
            />
            <TableContainer component={Paper} sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Front</TableCell>
                            <TableCell>Back</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>BGG Score</TableCell>
                            <TableCell>Players</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Genres</TableCell>
                            <TableCell>Rules</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filtered.map(game => (
                            <GameRow
                                key={game.id}
                                game={game}
                                onThumbnailClick={openModal}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={Boolean(popupSrc)}
                onClose={() => setPopupSrc(null)}
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible'
                    }
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    }
                }}
            >
                <DialogContent
                    sx={{
                        p: 0,
                        position: 'relative'
                    }}
                >
                    <IconButton
                        onClick={() => setPopupSrc(null)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'white',
                            zIndex: 10
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {popupSrc && (
                        <Box
                            component="img"
                            src={popupSrc}
                            alt="Full size"
                            sx={{
                                maxHeight: '90vh',
                                maxWidth: '90vw',
                                display: 'block',
                                borderRadius: 1,
                                cursor: 'pointer'
                            }}
                            onClick={() => setPopupSrc(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}