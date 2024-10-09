
import React, { useState } from 'react';

import { Plumbing } from '@mui/icons-material';

import {
    Button, Typography, Card, CardContent, CardActions, CardHeader, Paper,
    CircularProgress, Snackbar, IconButton, SnackbarCloseReason, Box, Stack,
} from '@mui/material';
import { Close } from '@mui/icons-material';


import { generateConfig } from './generate-config';
import { useModelParamsStore } from './state/ModelParams';

const Generating = () => {
    return (
        <CircularProgress sx={{mt: 2}}/>
    );
};

const ConfigGeneration = () => {

    const graphStore
        = useModelParamsStore((state) => state.graphStore);
    const vectorDB
        = useModelParamsStore((state) => state.vectorDB);
    const chunkerType
        = useModelParamsStore((state) => state.chunkerType);
    const chunkSize
        = useModelParamsStore((state) => state.chunkSize);
    const chunkOverlap
        = useModelParamsStore((state) => state.chunkOverlap);
    const modelDeployment
        = useModelParamsStore((state) => state.modelDeployment);
    const modelName
        = useModelParamsStore((state) => state.modelName);
    const temperature
        = useModelParamsStore((state) => state.temperature);
    const maxOutputTokens
        = useModelParamsStore((state) => state.maxOutputTokens);

    const setConfigUrl
        = useModelParamsStore((state) => state.setConfigUrl);

    const [errorMessage, setErrorMessage] = useState("");
    const [generating, setGenerating] = useState(false);
    const [open, setOpen] = React.useState(false);

    const generate = () => {

        setGenerating(true);

        generateConfig(
            graphStore, modelDeployment, vectorDB, chunkSize, chunkOverlap,
            maxOutputTokens, modelName, chunkerType, temperature,
        ).then(
            response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw response.statusText;
                }
            }
        ).then(
            blob => {
                setGenerating(false);
                if (blob) {
                    var url = window.URL.createObjectURL(blob);
                    setConfigUrl(url);
                }
            }
        ).catch(
            err => {
                console.log(err);
                setGenerating(false);
                setOpen(true);
                setConfigUrl("");
                setErrorMessage(
                    `Configuration generation failed: ${err}`
                );
            }
        );

    }

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
      <React.Fragment>
          <Button color="primary" size="small" onClick={handleClose}>
            CLOSE
          </Button>
          <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
          >
              <Close fontSize="small" />
          </IconButton>
      </React.Fragment>
    );

    return (
        <>


            <Box>
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }}>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                    >
                        <Plumbing color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            <Box>Deployment configuration</Box>
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{mt: 2}}>
                        When you have selected the configuration parameters
                        you need, select to generate the configuration
                        package.  This will make it available to download.
                    </Typography>
                    { generating ? <Generating/> : '' }
                    <Box sx={{mt: 1}}>
                        <Button onClick={() => generate()}>Generate</Button>
                    </Box>
                </Paper>
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={errorMessage}
                action={action}
            />

        </>
    );
}

export default ConfigGeneration;

