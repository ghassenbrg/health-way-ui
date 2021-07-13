import { Slot } from "./slot.model";

export class TimeSheet {
    id: number;
    day: string;
    startTime: Date;
    endTime: Date;
    doctor: string;
    slots?: Slot[];
    isDisabled?: boolean;
}