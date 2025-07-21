import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
    name: string;
    minPlayers: number;
    maxPlayers: number;
    language: string;
    genre: string;
    boxImageFront: FileList;
    boxImageBack: FileList;
    rulesPdf?: FileList;
};

const schema = yup.object({
    name: yup.string().required(),
    minPlayers: yup.number().required().min(1),
    maxPlayers: yup.number().required().min(yup.ref('minPlayers')),
    language: yup.string().required(),
    genre: yup.string().required(),
    boxImageFront: yup.mixed().required(),
    boxImageBack: yup.mixed().required(),
    rulesPdf: yup.mixed<FileList>().notRequired().nullable(),
}).required();

export default function SubmitGamePage(){
    const {register,handleSubmit,formState:{errors}}=useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data:FormData) => {
        const payload = new FormData();
        payload.append('name', data.name);
        payload.append('minPlayers', data.minPlayers);
        payload.append('maxPlayers', data.maxPlayers);
        payload.append('language', data.language);
        payload.append('genre', data.genre);
        payload.append('boxImageFront', data.boxImageFront);
        payload.append('boxImageBack', data.boxImageBack);
        if(data.rulesPdf?.[0]) payload.append('rulesPdf', data.rulesPdf[0]);

        fetch('/api/games',{
            method: 'POST',
            body: payload,
        })
            .then(res=>res.json())
            .then(() => alert('Game submitted!'))
            .catch(err => console.error(err));
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={"max-w-lg mx-auto p-6 space-y-4"}>
            <input {...register('name')} placeholder={"Name"} className={"w-full border p-2 rounded"}/>
            {errors.name && <p className={"text-red-600"}>Required</p>}
            <div className={"flex space-x-4"}>
                <input type={"number"} {...register('minPlayers')} placeholder={"Min Players"} className={"border p-2 rounded w-1/2"}/>
                <input type="number" {...register('maxPlayers')} placeholder="Max Players" className="border p-2 rounded w-1/2" />
            </div>
            <select {...register('language')} className="w-full border p-2 rounded">
                <option value="">Language</option>
                <option>English</option>
                <option>German</option>
                <option>French</option>
            </select>

            <select {...register('genre')} className="w-full border p-2 rounded">
                <option value="">Genre</option>
                <option>Strategy</option>
                <option>Party</option>
                <option>Family</option>
                <option>Co‑op</option>
            </select>

            <div>
                <label>Box Image 1:</label>
                <input type="file" accept="image/*" {...register('boxImageFront')} />
            </div>
            <div>
                <label>Box Image 2:</label>
                <input type="file" accept="image/*" {...register('boxImageBack')} />
            </div>
            <div>
                <label>Rules PDF (optional):</label>
                <input type="file" accept="application/pdf" {...register('rulesPdf')} />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit Game
            </button>
        </form>
    )
}