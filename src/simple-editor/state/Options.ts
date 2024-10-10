
import { create } from 'zustand'

export const DEFINITIONS_PROMPT = "definitions-prompt";
export const RELATIONSHIPS_PROMPT = "relationships-prompt";
export const TOPICS_PROMPT = "topics-prompt";
export const KNOWLEDGE_QUERY_PROMPT = "knowledge-query-prompt";
export const DOCUMENT_QUERY_PROMPT = "document-query-prompt";
export const ROWS_PROMPT = "rows-prompt";

interface Options {

    options : Set<string>;
    setOptions : (v: Set<string>) => void;
}

export const useOptionsStore = create<Options>()(
    (set) => ({

        options: new Set<string>(""),

        setOptions: (v) => set(() => ({
	    options: v
	})),

    })
);

