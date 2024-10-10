
import {
    Box, TextField,
} from '@mui/material';

interface PromptProps {
    value : string;
    onChange : (value : string) => void;
}

const Prompt : React.FC<PromptProps> = ({value, onChange}) => {

    return (
        <>

            <Box sx={{ mt: 4}}>
                <TextField fullWidth
                    id="outlined-multiline-static"
                    label="Prompt"
                    multiline
                    rows={25}
                    defaultValue={value}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange(event.target.value);
                        }
                    }
                />
            </Box>

        </>
    );
}

export default Prompt;

