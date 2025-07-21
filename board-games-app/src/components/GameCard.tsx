import type {BoardGame} from "../types/boardGame.ts";

interface Props{
    game: BoardGame;
    onThumbnailClick: (src: string) => void;
}

export default function GameCard({game,onThumbnailClick}:Props){
    return (
        <>
        <tr>
            <td className="border border-gray-300 p-1 h-32">
                <img
                    src={game.boxImageFrontUrl}
                    alt={game.name}
                    width={100}
                    height={100}
                    className="w-12 h-12 object-contain cursor-pointer"
                    onClick={() => onThumbnailClick(game.boxImageFrontUrl)}
                />
            </td>
            <td className="border border-gray-300 px-4 py-2 align-middle">
                <h2 className="font-bold">{game.name}</h2>
            </td>
            <td className="border border-gray-300 px-4 py-2 align-middle">
                {game.minPlayers}–{game.maxPlayers} Players
            </td>
            <td className="border border-gray-300 px-4 py-2 align-middle">
                {game.language}
            </td>
            <td className="border border-gray-300 px-4 py-2 align-middle">
                <div className="flex flex-wrap gap-1">
                    {game.genres.map(g => (
                        <span
                            key={g}
                            className="px-2 py-0.5 bg-gray-100 rounded truncate text-xs"
                        >
                          {g}
                        </span>
                    ))}
                </div>
            </td>
            <td className={"border border-gray-300 px-4 py-2 align-middle"}>
                {game.rulesPdfUrl && <a href={game.rulesPdfUrl} target={"_blank"}>Rules</a>}
            </td>
            {game.boxImageBackUrl && (
                <td className="border border-gray-300 px-4 py-2">
                    <img
                        src={game.boxImageBackUrl}
                        alt={`${game.name} back`}
                        width={100}
                        height={100}
                        className="h-24 object-contain cursor-pointer"
                        onClick={() => onThumbnailClick(game.boxImageBackUrl)}
                    />
                </td>
            )}
        </tr>
        </>
    );

}