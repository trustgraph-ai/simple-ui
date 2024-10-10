
import React from 'react';

import { Typography, ToggleButton } from '@mui/material';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { Stack } from '@mui/material';
import {
    Psychology,
    Check,
//    Spoke,
//    Plumbing,
//    Engineering,
//    Hub,
//    ChatBubble,
//    VerticalSplit,
//    MonitorHeart,
//    Polyline,
} from '@mui/icons-material';

import { useModelParamsStore } from './state/ModelParams';
import {
    useOptionsStore, DEFINITIONS_PROMPT, RELATIONSHIPS_PROMPT,
    TOPICS_PROMPT, KNOWLEDGE_QUERY_PROMPT, DOCUMENT_QUERY_PROMPT,
    ROWS_PROMPT,
} from './state/Options';

const ParamsForm: React.FC = ({
}) => {

    const options = useOptionsStore((state) => state.options);

    const setOptions = useOptionsStore((state) => state.setOptions);

    const definitions = options.has(DEFINITIONS_PROMPT);
    const relationships = options.has(RELATIONSHIPS_PROMPT);
    const topics = options.has(TOPICS_PROMPT);
    const kgQuery = options.has(KNOWLEDGE_QUERY_PROMPT);
    const docQuery = options.has(DOCUMENT_QUERY_PROMPT);
    const rows = options.has(ROWS_PROMPT);

    const set = (o : string, value : boolean) => {
        if (value) {
            const opts = new Set(options);
            opts.add(o);
            setOptions(opts);
        } else {
            const opts = new Set(options);
            opts.delete(o);
            setOptions(opts);
        }
    }

    const onDefinitions = () => {
        set(DEFINITIONS_PROMPT, !definitions);
    };

    const onRelationships = () => {
        set(RELATIONSHIPS_PROMPT, !relationships);
    };

    const onTopics = () => {
        set(TOPICS_PROMPT, !topics);
    };

    const onKgQuery = () => {
        set(KNOWLEDGE_QUERY_PROMPT, !kgQuery);
    };

    const onDocQuery = () => {
        set(DOCUMENT_QUERY_PROMPT, !docQuery);
    };

    const onRows = () => {
        set(ROWS_PROMPT, !rows);
    };

    const Option = ({enabled, onChange, avatar, title, content} : {
        enabled : boolean;
        onChange : () => void,
        avatar : any;
        title : string;
        content : any;
    }) => {
        return (
            <Card sx={{ width: '16rem' }}>
                <CardHeader
                  avatar={avatar}
                  title={title}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: 12 }}
                    >
                    {content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ToggleButton
                        value="check"
                        selected={enabled}
                        color="primary"
                        onChange={() => onChange()}
                    >
                        <Check/>
                    </ToggleButton>
                </CardActions>
            </Card>
        );
    };

    return (
        <>

            <Stack direction="row" spacing={2}
                sx={{flexWrap: 'wrap'}} useFlexGap
            >

                <Option
                    enabled={definitions}
                    onChange={onDefinitions}
                    avatar={<Psychology color="primary"/>}
                    title="Definitions prompt"
                    content={
                        'Tailor the default definitions-extraction prompt'
                    }

                />

                <Option
                    enabled={relationships}
                    onChange={onRelationships}
                    avatar={<Psychology color="primary"/>}
                    title="Relationships prompt"
                    content={
                        'Tailor the default relationships-extraction prompt'
                    }

                />

                <Option
                    enabled={topics}
                    onChange={onTopics}
                    avatar={<Psychology color="primary"/>}
                    title="Topics prompt"
                    content={
                        'Tailor the default topics-extraction prompt'
                    }

                />

                <Option
                    enabled={kgQuery}
                    onChange={onKgQuery}
                    avatar={<Psychology color="primary"/>}
                    title="Knowledge graph prompt"
                    content={
                        'Tailor the default knowledge-graph query prompt'
                    }

                />

                <Option
                    enabled={docQuery}
                    onChange={onDocQuery}
                    avatar={<Psychology color="primary"/>}
                    title="Document prompt"
                    content={
                        'Tailor the default document query prompt'
                    }

                />

                <Option
                    enabled={rows}
                    onChange={onRows}
                    avatar={<Psychology color="primary"/>}
                    title="Row extraction prompt"
                    content={
                        'Tailor the default row extraction prompt'
                    }

                />

            </Stack>

        </>

    );
};

export default ParamsForm;

