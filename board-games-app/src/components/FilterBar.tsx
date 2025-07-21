interface Props{
    name: string;
    minPlayers: number | null;
    maxPlayers: number | null;
    language: string;
    genres:string[];
    onChange: (filters: {
        name:string;
        minPlayers:number | null;
        maxPlayers:number | null;
        language:string;
        genres:string[];
    }) => void;
}

const languages=['English','German','other'];
const genresList=['Strategy','Party','Family','Co-Op','Social Deduction','Puzzle'];

export default function FilterBar({name, minPlayers, maxPlayers, language, genres, onChange}:Props){
    const updateGenres = (selected:string[]) =>
        onChange({name,minPlayers,maxPlayers,language,genres:selected});
    return(
        <div className={"flex space-x-4 p-4 bg-gray-50 rounded"}>
            <input type={"string"}
                   placeholder={"Name of the game"}
                   value={name ?? ''}
                   onChange={e=>onChange({name: e.target.value,minPlayers,maxPlayers,language,genres})}
                   className={"border p-1 rounded w-24"}
               />
            <input type={"number"}
                   placeholder={"Minimum Players"}
                   value={minPlayers ?? ''}
                   onChange={e=> onChange({name, minPlayers: e.target.value ? +e.target.value : null,maxPlayers,language,genres})}
                   className={"border p-1 rounded w-24"}
               />
            <input
                type="number"
                placeholder="Max Players"
                value={maxPlayers ?? ''}
                onChange={e => onChange({name, minPlayers, maxPlayers: e.target.value ? +e.target.value : null, language, genres })}
                className="border p-1 rounded w-24"
            />
            <select
                value={language}
                onChange={e => onChange({name, minPlayers, maxPlayers, language: e.target.value, genres })}
                className="border p-1 rounded"
            >
                <option value="">All Languages</option>
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
            <select
                multiple
                size={4}
                value={genres}
                onChange={e=>{
                    const selected = Array.from(e.target.selectedOptions)
                        .map(o => o.value);
                    updateGenres(selected);
                }}
                className="border p-1 rounded h-32"
            >
                {genresList.map(g => (
                    <option key={g} value={g}>{g}</option>
                ))}
            </select>
        </div>
    )
}