import React, {FC} from 'react';
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {ChevronLeftIcon, ChevronRightIcon, TrashIcon} from "@radix-ui/react-icons"
import {Button} from "@/components/ui/button";
import {Candidate} from "@/components/StatusColumns";

interface CandidateCardProps {
    candidateData: Candidate
    handleProgressCandidate: (candidateData: Candidate) => void;
    handleRegressCandidate: (candidateData: Candidate) => void;
    handleDeleteCandidate: (userId: string) => void;
}

export const CandidateCard: FC<CandidateCardProps> = (props) => {
    const {candidateData, handleProgressCandidate, handleRegressCandidate, handleDeleteCandidate} = props

    const hideProgressButton = () => {
        if (candidateData.status === 'hired') return true
    }

    const hideRegressButton = () => {
        if (candidateData.status === 'sourced') return true
    }

    return (
        <div className="mb-2">
            <Card className="shadow-none">
                <CardHeader className="flex-row justify-between align-middle">
                    <div>
                        <CardTitle>
                            {candidateData.fullName}
                        </CardTitle>
                        <CardDescription>
                            {candidateData.email}
                        </CardDescription>
                    </div>

                    <div>
                        <Button onClick={() => handleDeleteCandidate(candidateData.userId)}
                                className="w-7 h-7"
                                variant="destructive"
                                size="icon">
                            <TrashIcon className="h-4 w-4"/>
                        </Button>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-center align-middle gap-2">
                    {!hideRegressButton() &&
                        <Button onClick={() => handleRegressCandidate(candidateData)} className="shadow-none"
                                variant="outline" size="icon">
                            <ChevronLeftIcon className="h-4 w-4"/>
                        </Button>}
                    {!hideProgressButton() && <Button onClick={() => handleProgressCandidate(candidateData)} className="shadow-none"
                             variant="outline" size="icon">
                        <ChevronRightIcon className="h-4 w-4"/>
                    </Button>}
                </CardFooter>
            </Card>
        </div>
    );
};