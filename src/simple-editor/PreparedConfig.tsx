
import { Plumbing } from '@mui/icons-material';

import {
    Button, Typography, Alert, Paper, Box, Stack,
} from '@mui/material';

import { Check } from '@mui/icons-material';

import { useModelParamsStore } from './state/ModelParams';

const PreparedConfig = () => {

    const graphStore
        = useModelParamsStore((state) => state.graphStore);
    const vectorDB
        = useModelParamsStore((state) => state.vectorDB);
    const modelDeployment
        = useModelParamsStore((state) => state.modelDeployment);
    const modelName
        = useModelParamsStore((state) => state.modelName);

    const configUrl
        = useModelParamsStore((state) => state.configUrl);

    const download = () => {

    if (!configUrl) return;
        let alink = document.createElement("a");
        alink.href = configUrl;
        alink.download = "deploy.zip";
        alink.click();
    };

    return (
        <>

            <Box>
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                    >
                        <Plumbing color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            Deployment configuration
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 0, mb: 2}}>
                        <ul>
                            <li>Model deployment: {modelDeployment}</li>
                            <li>Model name: {modelName}</li>
                            <li>Graph store: {graphStore}</li>
                            <li>Vector DB: {vectorDB}</li>
                        </ul>
                    </Typography>
                    <Alert icon={<Check fontSize="inherit"/>}
                        severity="success"
                    >
                        Configuration generation was successful
                    </Alert>
                    <Button variant="outlined" onClick={() => download()}>
                        Download
                    </Button>
                </Paper>
            </Box>

        </>
    );
}

export default PreparedConfig;

