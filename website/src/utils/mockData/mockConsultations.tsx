interface Consultations {
    id: number,
    name: string,
    dr_name: string,
    location: string,
    date: string,
    records: Record[];
}

export type Record = NoteRecord | LabRecord;

interface BaseRecord {
  id: number;
  date: string;
}

interface NoteRecord extends BaseRecord {
  type: "note";
  note: string[];
}

interface LabRecord extends BaseRecord {
  type: "lab";
  data: {
    [key: string]: number;
  };
}

export const mockConsultations: Consultations[] = [
    {
        id: 10001,
        name: "Illness Consultation",
        dr_name: "Dr. Sarah Williams",
        location: "Sheffield Walk-in Centre",
        date: "2025-03-10",
        records: [
            {
                id: 25031001,
                date: "2025-03-10",
                type: "note",
                note: [
                    "Consultation date.",
                    "Patient reports feeling unwell for 2 days."
                ],
            },
            {
                id: 25031002,
                date: "2025-03-10",
                type: "lab",
                data: {
                    temperature: 37.7,
                    heart_rate: 78,
                },
            },
            {
                id: 25031003,
                date: "2025-03-10",
                type: "note",
                note: [
                    "Slightly elevated temperature noted.",
                    "Advised rest and hydration."
                ]
            }
        ]
    },
    {
        id: 10002,
        name: "Blood Pressure Check",
        dr_name: "Dr. Mark Johnson",
        location: "Sheffield Walk-in Centre",
        date: "2025-03-18",
        records: [
            {
                id: 25031801,
                date: "2025-03-18",
                type: "note",
                note: [
                    "Consultation date - follow-up for blood pressure."
                ],
            },
            {
                id: 25031901,
                date: "2025-03-19",
                type: "lab",
                data: {
                    systolic_bp: 132,
                    diastolic_bp: 86,
                    heart_rate: 70,
                }
            },
            {
                id: 25031902,
                "date": "2025-03-19",
                "type": "note",
                "note": [
                    "Advised monitoring and lifestyle adjustments.",
                    "Scheduled next follow-up in four weeks."
                ]
            }
        ]
    },
    {
        id: 10003,
        name: "Blood Pressure Follow-up",
        dr_name: "Dr. Mark Johnson",
        location: "Sheffield Walk-in Centre",
        date: "2025-04-16",
        records: [
            {
                id: 25041601,
                date: "2025-04-16",
                type: "note",
                note: [
                    "Consultation date - follow-up for blood pressure.",
                    "Patient reports no significant symptoms but occasional headaches."
                ]
            },
            {
                id: 25041701,
                date: "2025-04-17",
                type: "lab",
                data: {
                    systolic_bp: 128,
                    diastolic_bp: 82,
                    heart_rate: 72
                }
            },
            {
                id: 25041702,
                date: "2025-04-17",
                type: "note",
                note: [
                    "Blood pressure slightly improved but still elevated.",
                    "Recommended continued monitoring and dietary modifications.",
                    "Scheduled next follow-up in six weeks."
                ]
            }
        ]
    }    
];