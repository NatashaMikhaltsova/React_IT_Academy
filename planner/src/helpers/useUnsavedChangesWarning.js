import { useState, useEffect } from "react";
import { usePrompt } from './react-router-dom_prompt_blocker';

const useUnsavedChangesWarning = (message = "Are you sure want to discard changes?") => {
    const [isDirty, setDurty] = useState(false);
    useEffect(() => {
        //Detecting browser closing
        window.onbeforeunload = isDirty && (() => message);

        return () => {
            window.onbeforeunload = null
        }
    }, [isDirty]);

    const routerPrompt = usePrompt(message, isDirty);
    return [routerPrompt, () => setDurty(true), () => setDurty(false)]
};

export default useUnsavedChangesWarning;