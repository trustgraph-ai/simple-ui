
import React from 'react';

import { Psychology } from '@mui/icons-material';
import {
    Typography, Paper, Box, Stack,
} from '@mui/material';

import { useModelParamsStore } from './state/ModelParams';

const getInstructions = (model : string) => {
    if (model == "claude") {
        return <>
            <p>
                To use Anthropic Claude, you need a Claude API key.
                Provide the Claude API key in an environment variable
                when runnging the Docker Compose configuration.
            </p>
            <pre>export CLAUDE_KEY=
            <span className="variable">TOKEN-GOES-HERE</span>
            </pre>
        </>;
    } else if (model == "bedrock") {
        return <>
            <p>
                To use AWS Bedrock, you must have enabled models in the
                AWS Bedrock console.  You must also provide an
                AWS access key ID and secret key.
            </p>
            <pre>export AWS_ID_KEY=
            <span className="variable">ID-KEY-HERE</span>
            <br/>
            export AWS_SECRET_KEY=
            <span className="variable">TOKEN-GOES-HERE</span>
            </pre>
        </>;
    } else if (model == "azure") {
        return <>
            <p>
                To use Azure Serverless APIs, you need to have a serverless
                endpoint deployed, and you must also provide an endpoint
                token as an environment variable.
             </p>
            <pre>export AZURE_ENDPOINT=
            <span className="variable">https://ENDPOINT.API.HOST.GOES.HERE/</span>
            <br/>
            export AZURE_TOKEN=
            <span className="variable">TOKEN-GOES-HERE</span>
            </pre>
        </>;
    } else if (model == "cohere") {
        return <>
            <p>To use Cohere APIs, you need an API token which must
            be provided in an environment variable.</p>
            <pre>export COHERE_KEY=
            <span className="variable">TOKEN-GOES-HERE</span>
            </pre>
        </>;
    } else if (model == "llamafile") {
        return <>
            <p>To use Llamafile, you must have a Llamafile services running
            on an accessible host.  The Llamafile host must be provided
            in an environment variable.</p>
            <pre>export LLAMAFILE_URL=
            <span className="variable">LLAMAFILE-URL</span>
            </pre>
        </>;
    } else if (model == "ollama") {
        return <>
            <p>
                The power of Ollama is the flexibility it provides in
                Language Model deployments. Being able to run LMs with
                Ollama enables fully secure AI TrustGraph pipelines
                that aren't relying on any external APIs. No data is
                leaving the host environment or network.
                The Ollama service must be running, and have required
                models available using <code>ollama pull</code>.
                The Ollama service URL must be provided in an environment
                variable.
            </p>
            <pre>export OLLAMA_HOST=
            <span className="variable">http://ollama-host:11434</span>
            </pre>
            <p>
                Replace the URL with the URL of your Ollama service.
            </p>
        </>;
    } else if (model == "openai") {
        return <>
            <p>To use OpenAI APIs, you need an API token which must
            be provided in an environment variable.</p>
            <pre>export OPENAI_KEY=
            <span className="variable">TOKEN-GOES-HERE</span>
            </pre>
        </>;
    } else if (model == "vertexai") {
        return <>
            <p>To use VertexAI, you need to have a Google Cloud credential
            file provisioned for a service account which has access to the
            VertexAI services.  This means signing up to GCP and using
            an existing, or launching a new GCP project.
            The GCP credential will be a JSON file
            which should be stored in <code>vertexai/private.json</code>.
            </p>
            <p>
            The credential file is mounted as a volume in Docker Compose,
            which can cause issues with SELinux if you are running on Linux.
            Make sure that Docker has access to volume files if this
            affects you.
            </p>
            <pre>chcon -Rt svirt_sandbox_file_t vertexai/
            </pre>
        </>;
    } else {
        return <> </>;
    }
   
}

interface DeploymentModelProps {
}

const DeploymentModel: React.FC<DeploymentModelProps> = ({
}) => {

    const modelDeployment = useModelParamsStore((state) => state.modelDeployment);

    const instructions = getInstructions(modelDeployment);

    return (

        <>
            <Box>
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Typography variant="h6" component="h3">
                        <Stack
                            direction="row" spacing={2}
                            alignItems="center"
                        >
                            <Psychology color="primary" fontSize="large"/>
                            <Box>Model credentials</Box>
                        </Stack>
                    </Typography>
                    <Typography variant="body2">
                        {instructions}
                    </Typography>
                </Paper>
            </Box>
        </>

    );
};

export default DeploymentModel;

