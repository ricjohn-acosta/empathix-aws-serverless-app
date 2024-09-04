import {rootApiUrl} from "@/lib/rootApiUrl";

export const deleteCandidate = async (userId: string) => {
    try {
        const res = await fetch(`${rootApiUrl}/candidates/delete/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
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