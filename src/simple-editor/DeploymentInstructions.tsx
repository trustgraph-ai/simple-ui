
import React from 'react';

import {
    Typography, Card, CardContent, CardHeader, Box, Paper, Stack,
} from '@mui/material';

import { RocketLaunch } from '@mui/icons-material';

interface DeploymentInstructionsProps {
}

const DeploymentInstructions: React.FC<DeploymentInstructionsProps> = ({
}) => {

    return (

        <>


            <Box>
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }}>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                    >
                        <RocketLaunch color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            Launch
                        </Typography>
                    </Stack>

                    <Typography variant="body2" sx={{ mt: 2}}>

                        When you download the deploy configuration, you will
                        have a ZIP file containing all the configuration
                        needed to launch TrustGraph in Docker Compose or
                        Podman Compose.
                        Unzip the ZIP file...

                        <pre>unzip deploy.zip
                        </pre>

                        and launch...

                        <pre>docker compose -f docker-compose.yaml up -d
                        </pre>

                    </Typography>

                    <Typography variant="body2">

                        If you are on Linux, running SELinux, you may need
                        to change permissions on files in the deploy bundle
                        so that they are accessible from within containers.
                        This affects
                        the <code>grafana</code> and <code>prometheus</code> directories.
                        
                        <pre>chcon -Rt svirt_sandbox_file_t grafana prometheus<br/>
                        chmod 755 prometheus/ grafana/ grafana/*/<br/>
                        chmod 644 prometheus/* grafana/*/*
                        </pre>

                    </Typography>

                </Paper>
            </Box>

        </>

    );

};

export default DeploymentInstructions;

