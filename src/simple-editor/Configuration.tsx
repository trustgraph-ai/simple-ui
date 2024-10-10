
import React from 'react';

import { Typography, Box } from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import ParamsForm from './ParamsForm';
import AdvancedOptions from './AdvancedOptions';
import Deployment from './Deployment';

import { usePromptsStore } from './state/Prompts';
import {
    useOptionsStore, DEFINITIONS_PROMPT, RELATIONSHIPS_PROMPT,
    TOPICS_PROMPT, KNOWLEDGE_QUERY_PROMPT, DOCUMENT_QUERY_PROMPT,
    ROWS_PROMPT,
} from './state/Options';

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

    let tabs = [
        <Tab key="model" value="model" label="Model"/>,
        <Tab key="more" value="more" label="More"/>
    ];

    if (opts.has(DEFINITIONS_PROMPT))
        tabs.push(<Tab key="defs" value="defs" label="Definitions prompt"/>);

    if (opts.has(RELATIONSHIPS_PROMPT))
        tabs.push(<Tab key="rels" value="rels" label="Relationships prompt"/>);

    if (opts.has(TOPICS_PROMPT))
        tabs.push(<Tab key="topics" value="topics" label="Topics prompt"/>);

    if (opts.has(KNOWLEDGE_QUERY_PROMPT))
        tabs.push(<Tab key="kgq" value="kgq" label="Knowledge graph prompt"/>);

    if (opts.has(DOCUMENT_QUERY_PROMPT))
        tabs.push(<Tab key="docq" value="docq"
            label="Document query prompt"
        />);

    if (opts.has(ROWS_PROMPT))
        tabs.push(<Tab key="rows" value="rows"
            label="Rows prompt"
        />);

    tabs.push(<Tab key="depl" value="depl" label="Deployment"/>);

    return tabs;

}

const Configuration: React.FC = () => {

    const [value, setValue] = React.useState("model");

    const handleChange = (_event: React.SyntheticEvent, value: string) => {
        setValue(value);
    };

    const options
        = useOptionsStore((state) => state.options);

    const definitionsPrompt
        = usePromptsStore((state) => state.definitions);

    const relationshipsPrompt
        = usePromptsStore((state) => state.relationships);

    const topicsPrompt
        = usePromptsStore((state) => state.topics);

    const knowledgeQueryPrompt
        = usePromptsStore((state) => state.knowledgeQuery);

    const documentQueryPrompt
        = usePromptsStore((state) => state.documentQuery);

    const rowsPrompt
        = usePromptsStore((state) => state.rows);




    const setDefinitionsPrompt
        = usePromptsStore((state) => state.setDefinitions);

    const setRelationshipsPrompt
        = usePromptsStore((state) => state.setRelationships);

    const setTopicsPrompt
        = usePromptsStore((state) => state.setTopics);

    const setKnowledgeQueryPrompt
        = usePromptsStore((state) => state.setKnowledgeQuery);

    const setDocumentQueryPrompt
        = usePromptsStore((state) => state.setDocumentQuery);

    const setRowsPrompt
        = usePromptsStore((state) => state.setRows);

    return (

        <>

            <Box className="configuration">

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value} onChange={handleChange}
                    variant="scrollable"
                >
                    {tabs(options)}
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

                <Prompt
                    value={relationshipsPrompt}
                    onChange={
                        (v) => {
                            setRelationshipsPrompt(v);
                        }
                    }
                />

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="topics">

                <Typography variant="h5" component="h2" gutterBottom>
                  Topics prompt
                </Typography>

                <Prompt
                    value={topicsPrompt}
                    onChange={
                        (v) => {
                            setTopicsPrompt(v);
                        }
                    }
                />

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="kgq">

                <Typography variant="h5" component="h2" gutterBottom>
                  Knowledge graph query prompt
                </Typography>

                <Prompt
                    value={knowledgeQueryPrompt}
                    onChange={
                        (v) => {
                            setKnowledgeQueryPrompt(v);
                        }
                    }
                />

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="docq">

                <Typography variant="h5" component="h2" gutterBottom>
                  Document query prompt
                </Typography>

                <Prompt
                    value={documentQueryPrompt}
                    onChange={
                        (v) => {
                            setDocumentQueryPrompt(v);
                        }
                    }
                />

            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="rows">

                <Typography variant="h5" component="h2" gutterBottom>
                  Rows extraction prompt
                </Typography>

                <Prompt
                    value={rowsPrompt}
                    onChange={
                        (v) => {
                            setRowsPrompt(v);
                        }
                    }
                />

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

