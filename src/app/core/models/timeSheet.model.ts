import { Timing } from "./timing.model";

export class TimeSheet {
    id: number;
    day: string;
    startTime: Date;
    endTime: Date;
    doctor: string;
    timings?: Timing[];
}