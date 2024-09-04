import {rootApiUrl} from "@/lib/rootApiUrl";
import {Candidate} from "@/components/StatusColumns";

export const updateCandidate = async (params: Candidate) => {
    try {
        const res = await fetch(`${rootApiUrl}/candidates/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        });

        if (!res.ok) {
            console.error(`HTTP error! status: ${res.status}`);
        }

        return true
    } catch (e) {
        console.error("Error updating candidate:", e);
        return;
    }
}