

export type Patient = {
    id: string;
    name: string;
    caretaker: string;
    email: string;
    date: Date;
    symptoms: string;
}

//para omitir el Id
export type DraftPatient = Omit<Patient, 'id'>;

