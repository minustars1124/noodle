/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_TRIAL_COUNT: string;
    VITE_WORD_LENGTH: string;
    VITE_ANSWER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
