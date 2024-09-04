'use client'

import React, {FC, useEffect, useState} from 'react';
import {CandidateCard} from "@/components/CandidateCard";
import {statusToStep, stepToStatus} from "@/lib/utils";
import {getAllCandidates} from "@/services/getAllCandidates";
import {updateCandidate} from "@/services/updateCandidate";
import {deleteCandidate} from "@/services/deleteCandidate";
import AddCandidateForm from "@/components/AddCandidateForm";
import {nanoid} from "nanoid";
import {createCandidate} from "@/services/createNewCandidate";

export type statusType = "sourced" | "in-progress" | "interview" | "hired"
type directionType = "progress" | "regress"

export interface Candidate {
    userId: string;
    status: statusType;
    fullName: string;
    email: string;
}

export const StatusColumns: FC = () => {

    const [candidates, setCandidates] = useState<Candidate[] | null>(null)

    useEffect(() => {
        handleFetchCandidates()
    }, [])

    const updateCandidateStatus = async (candidateData: Candidate, direction: directionType) => {
        if (!candidateData.userId || !candidates) return;

        const currentStep = statusToStep[candidateData.status];
        const stepChange = direction === 'progress' ? 1 : -1;
        const newStep = currentStep + stepChange;

        // Ensure the new step is within valid bounds
        if (newStep < 1 || newStep > 4) return;

        const newStatus = stepToStatus[newStep];


        setCandidates(prevCandidates =>
            prevCandidates!.map(candidate =>
                candidate.userId === candidateData.userId
                    ? {...candidate, status: newStatus}
                    : candidate
            )
        );

        updateCandidate({...candidateData, status: newStatus})
    };

    const handleFetchCandidates = async () => {
        const candidates = await getAllCandidates()
        if (candidates) {
            setCandidates(candidates)
        }
    }

    const handleProgressCandidate = (candidateData: Candidate) => {
        updateCandidateStatus(candidateData, 'progress');
    };

    const handleRegressCandidate = (candidateData: Candidate) => {
        updateCandidateStatus(candidateData, 'regress');
    };

    const handleDeleteCandidate = (userId: string) => {
        if (!userId || !candidates) return

        setCandidates(prevCandidates =>
            prevCandidates!.filter((candidate: Candidate) => candidate.userId !== userId)
        );

        deleteCandidate(userId)
    };

    const handleAddCandidate = async (formData) => {
        // Ideally we'd have validators for this form.
        if (formData) {
            // Ideally we add the id in the lambda handler.
            const newCandidate: Candidate = {...formData, userId: nanoid(), status: 'sourced'}

            setCandidates(prevCandidates => [...prevCandidates, newCandidate]);

            createCandidate(newCandidate)
        }
    };

    const displayCandidates = (status: statusType) => {
        if (!candidates) return

        return candidates?.filter(candidate => candidate.status === status)
            .map(candidate => (
                <CandidateCard
                    key={candidate.userId}
                    candidateData={candidate}
                    handleProgressCandidate={handleProgressCandidate}
                    handleRegressCandidate={handleRegressCandidate}
                    handleDeleteCandidate={handleDeleteCandidate}
                />
            ));
    }


    return (
        <>
            <div className="flex gap-4 items-center">
                <div className="font-bold text-3xl">Candidates</div>
                <AddCandidateForm handleAddCandidate={handleAddCandidate}/>
            </div>

            <div className="flex justify-between space-x-5">
                <div className="flex-1 p-4">
                    <div className="rounded-lg bg-yellow-200 px-2 py-2 mb-4 text-xs text-left">SOURCED</div>
                    {displayCandidates('sourced')}
                </div>
                <div className="flex-1 p-4">
                    <div className="rounded-lg bg-sky-200 px-2 py-2 mb-4 text-xs text-left">IN PROGRESS</div>
                    {displayCandidates('in-progress')}
                </div>
                <div className="flex-1 p-4">
                    <div className="rounded-lg bg-indigo-200 px-2 py-2 mb-4 text-xs text-left">INTERVIEW</div>
                    {displayCandidates('interview')}
                </div>
                <div className="flex-1 p-4">
                    <div className="rounded-lg bg-emerald-200 px-2 py-2 mb-4 text-xs text-left">HIRED</div>
                    {displayCandidates('hired')}
                </div>
            </div>
        </>
    );
};