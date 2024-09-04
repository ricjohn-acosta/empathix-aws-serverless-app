import {rootApiUrl} from "@/lib/rootApiUrl";
import {Candidate} from "@/components/StatusColumns";

export const getAllCandidates = async () => {
    try {
        const res = await fetch(`${rootApiUrl}/candidates/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.error(`HTTP error! status: ${res.status}`);
        }

        const candidates: Candidate[] = await res.json();
        return candidates
    } catch (e) {
        console.error("Error fetching candidates:", e);
        return;
    }
}