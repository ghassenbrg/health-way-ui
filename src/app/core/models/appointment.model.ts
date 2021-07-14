export class Appointment {
    id: number;
    startTime: Date;
    endTime: Date;
    date: Date;
    status: string;
    patient: string;
    doctor: string;
}
export class AppointmentInput {
    startTime: string;
    endTime: string;
    date: string;
    status: string;
    patient: string;
    doctor: string;
}