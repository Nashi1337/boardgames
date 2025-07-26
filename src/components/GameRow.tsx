import type { BoardGame } from '../types/boardGame';
import {TableRow, TableCell, Chip} from '@mui/material';
import {Link} from "react-router-dom";

export default function GameRow({
        game,
        onThumbnailClick,
    }: {
    game: BoardGame;
    onThumbnailClick: (src: string) => void;
}) {
    return (
        <TableRow hover>
            <TableCell>
                <img
                    src={game.boxImageFrontUrl}
                    alt=""
                    style={{ width: 40, height: 40, objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => onThumbnailClick(game.boxImageFrontUrl)}
                />
            </TableCell>
            <TableCell>
                {game.boxImageBackUrl && (
                    <img
                        src={game.boxImageBackUrl}
                        alt=""
                        style={{ width: 40, height: 40, objectFit: 'contain', cursor: 'pointer' }}
                        onClick={() => onThumbnailClick(game.boxImageBackUrl)}
                    />
                )}
            </TableCell>
            <TableCell>{game.name}</TableCell>
            <TableCell>{game.bggUrl && (
                <Link to={game.bggUrl} target={"_blank"}>{game.score}</Link>
            )}</TableCell>
            <TableCell>{game.minPlayers}–{game.maxPlayers}</TableCell>
            <TableCell>{game.language}</TableCell>
            <TableCell>
                {game.genres.map(g => (
                    <Chip key={g} label={g} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                ))}
            </TableCell>
            <TableCell>
                {game.rulesPdfUrl && (
                    <Link to={game.rulesPdfUrl} target="_blank" rel="noopener">Rules</Link>
                )}
            </TableCell>
        </TableRow>
    );
}
