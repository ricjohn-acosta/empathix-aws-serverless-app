import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {statusType} from "@/components/StatusColumns";

type StatusToStepMap = {
    [key: string]: number;
}

type StepToStatusMap = {
    [key: number]: string;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const statusToStep: StatusToStepMap = {
    "sourced": 1,
    "in-progress": 2,
    "interview": 3,
    "hired": 4,
}

export const stepToStatus: StepToStatusMap = {
    1: "sourced",
    2: "in-progress",
    3: "interview",
    4: "hired",
}