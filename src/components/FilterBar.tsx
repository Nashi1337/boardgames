import {
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    OutlinedInput,
    Chip,
    FormHelperText
} from '@mui/material';
import type { Filters } from '../types/filters';

interface FilterBarProps extends Filters {
    onChange: (newFilters: Filters) => void;
    allGenres: string[];
    allLanguages: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function FilterBar({
                                      name,
                                      minPlayers,
                                      maxPlayers,
                                      language,
                                      genres,
                                      allGenres,
                                      allLanguages,
                                      onChange
                                  }: FilterBarProps) {
    const update = <K extends keyof Filters>(field: K, value: Filters[K]) =>
        onChange({ name, minPlayers, maxPlayers, language, genres, [field]: value } as Filters);

    return (
        <Box display="flex" flexWrap="wrap" gap={2} p={2}>
            <TextField
                label="Name"
                variant="filled"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                    },
                }}
                value={name}
                onChange={(e) => update('name', e.target.value)}
                size="small"
                margin="normal"
            />

            <TextField
                label="Min Players"
                variant="filled"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                    },
                }}
                type="number"
                value={minPlayers ?? ''}
                onChange={(e) => update('minPlayers', e.target.value ? +e.target.value : null)}
                size="small"
                margin="normal"
                slotProps={{input:{ inputProps: { min: 0 }} }}
            />

            <TextField
                label="Max Players"
                variant="filled"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                    },
                }}
                type="number"
                value={maxPlayers ?? ''}
                onChange={(e) => update('maxPlayers', e.target.value ? +e.target.value : null)}
                size="small"
                margin="normal"
                slotProps={{input:{ inputProps: { min: 0 }} }}
            />

            <FormControl variant="outlined" size="small" sx={{
                    minWidth: 120,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                    },
                }}
                margin="normal"
            >
                <InputLabel>Language</InputLabel>
                <Select
                    label="Language"
                    value={language}
                    sx={{

                    }}
                    onChange={(e) => update('language', e.target.value)}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {allLanguages.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                            {lang}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{
                    minWidth: 120,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                    },
                }}
                margin="normal">
                <InputLabel>Genres</InputLabel>
                <Select
                    multiple
                    value={genres}
                    onChange={(e) => update('genres', e.target.value as string[])}
                    input={<OutlinedInput label="Genres" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} size="small" />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {allGenres.map((g) => (
                        <MenuItem key={g} value={g}>
                            {g}
                        </MenuItem>
                    ))}
                    margin="normal"
                </Select>
                <FormHelperText>Select one or more genres</FormHelperText>
            </FormControl>
        </Box>
    );
}
