
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

const ParamsForm: React.FC = ({
}) => {

    const DEFINITIONS_PROMPT = "definitions-prompt";
    const RELATIONSHIPS_PROMPT = "relationships-prompt";
    const TOPICS_PROMPT = "topics-prompt";
    const KG_QUERY_PROMPT = "kg-query-prompt";

    const advancedOptions
        = useModelParamsStore((state) => state.advancedOptions);

    const setAdvancedOptions
        = useModelParamsStore((state) => state.setAdvancedOptions);

    const definitions = advancedOptions.has(DEFINITIONS_PROMPT);
    const relationships = advancedOptions.has(RELATIONSHIPS_PROMPT);
    const topics = advancedOptions.has(TOPICS_PROMPT);
    const kgQuery = advancedOptions.has(KG_QUERY_PROMPT);

    const set = (o : string, value : boolean) => {
        if (value) {
            const opts = new Set(advancedOptions);
            opts.add(o);
            setAdvancedOptions(opts);
        } else {
            const opts = new Set(advancedOptions);
            opts.delete(o);
            setAdvancedOptions(opts);
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
        set(KG_QUERY_PROMPT, !kgQuery);
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

            <Stack direction="row" spacing={2}>

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
                        'Tailor the default knowledge-extraction prompt'
                    }

                />

            </Stack>

        </>

    );
};

export default ParamsForm;

