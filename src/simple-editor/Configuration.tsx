
import React from 'react';

import { Typography, Box } from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import ParamsForm from './ParamsForm';
import AdvancedOptions from './AdvancedOptions';
import Deployment from './Deployment';
import { useModelParamsStore } from './state/ModelParams';

import Prompt from './Prompt';

interface TabPanelProps {
    children?: React.ReactNode;
    tabId: string;
    value: string;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, tabId, value, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== tabId}
            id={`simple-tabpanel-${tabId}`}
            aria-labelledby={`simple-tab-${tabId}`}
            {...other}
        >
            {value === tabId && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const tabs = (opts : Set<string>) => {

    const DEFINITIONS_PROMPT = "definitions-prompt";
    const RELATIONSHIPS_PROMPT = "relationships-prompt";
    const TOPICS_PROMPT = "topics-prompt";
    const KG_QUERY_PROMPT = "kg-query-prompt";

    let tabs = [
        <Tab key="model" value="model" label="Model"/>,
        <Tab key="more" value="more" label="More"/>
    ];

    if (opts.has(DEFINITIONS_PROMPT))
        tabs.push(<Tab key="defs" value="defs" label="Definitions prompt"/>);

    if (opts.has(RELATIONSHIPS_PROMPT))
        tabs.push(<Tab key="rels" value="rels" label="Relationships prompt"/>);

    if (opts.has(TOPICS_PROMPT))
        tabs.push(<Tab key="tops" value="topics" label="Topics prompt"/>);

    if (opts.has(KG_QUERY_PROMPT))
        tabs.push(<Tab key="kgq" value="kgq" label="Knowledge graph prompt"/>);

    tabs.push(<Tab key="depl" value="depl" label="Deployment"/>);

    return tabs;

}

const Configuration: React.FC = () => {

    const [value, setValue] = React.useState("model");

    const handleChange = (_event: React.SyntheticEvent, value: string) => {
        setValue(value);
    };

    const advancedOptions
        = useModelParamsStore((state) => state.advancedOptions);

    const definitionsPrompt
        = useModelParamsStore((state) => state.definitionsPrompt);

    const setDefinitionsPrompt
        = useModelParamsStore((state) => state.setDefinitionsPrompt);

    return (

        <>

            <Box className="configuration">

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value} onChange={handleChange}
                    variant="scrollable"
                >
                    {tabs(advancedOptions)}
                </Tabs>
            </Box>

            <CustomTabPanel value={value} tabId="model">

                <Typography variant="h5" component="h2" gutterBottom>
                  Model parameters
                </Typography>

                <ParamsForm/>

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="more">

                <Typography variant="h5" component="h2" gutterBottom>
                  Additional configuration
                </Typography>

                <AdvancedOptions/>

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="defs">

                <Typography variant="h5" component="h2" gutterBottom>
                  Definitions prompt
                </Typography>

                <Prompt
                    value={definitionsPrompt}
                    onChange={
                        (v) => {
                            console.log(v);
                            setDefinitionsPrompt(v);
                        }
                    }
                />

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="rels">

                <Typography variant="h5" component="h2" gutterBottom>
                  Relationships prompt
                </Typography>

                <p>asdasdasd</p>

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="tops">

                <Typography variant="h5" component="h2" gutterBottom>
                  Topics prompt
                </Typography>

                <p>asdasdasd</p>

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="kgq">

                <Typography variant="h5" component="h2" gutterBottom>
                  Knowledge graph query prompt
                </Typography>

                <p>asdasdasd</p>

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="depl">

                <Box className="deployment">

                    <Typography variant="h5" component="h2" gutterBottom>
                      Deployment process
                    </Typography>

                    <Deployment/>

                </Box>

            </CustomTabPanel>

            </Box>

        </>

    );

}

export default Configuration;

