import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

function RoleSelect({ value, onChange }: { value: string; onChange: (event: SelectChangeEvent) => void }) {
    return (
        <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="role-select-label">Cargo</InputLabel>
            <Select
                labelId="role-select-label"
                id="role-select"
                name="role"
                value={value}
                onChange={onChange}
                label="Cargo"
            >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="client">Client</MenuItem>
            </Select>
        </FormControl>
    );
}

export default RoleSelect;
