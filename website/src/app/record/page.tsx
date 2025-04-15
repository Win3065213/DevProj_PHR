"use client"

import { LabValueBar } from '@/components/elements/valueBar';
import Navbar from '@/components/navbar';
import { mockConsultations, Record } from '@/utils/mockData/mockConsultations';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecordDetailPage() {
    const consID = useSearchParams().get('id'); // Access the dynamic recordID from the URL
    const [records, setRecords] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!consID) {
            // Router query might be empty on initial render
            return;
        }

        setLoading(true);
        setError(null);

        const consultation = mockConsultations.find(
            (cons) => cons.id === Number(consID)
        );

        if (consultation) {
            setRecords(consultation.records);
        } else {
            setError(`Record with ID ${consID}} not found.`);
        }
        setLoading(false);
    }, [consID]); // Re-run effect when recordID changes

    if (loading) {
        return <div>Loading record details for ID: {consID}</div>;
    }

    if (error) {
        return <div>Error loading record from consultation {consID}: {error}</div>;
    }

    function formatDate(isoDate: string): string {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    }

    return (
        <div className='flex px-10 py-5'>
            <aside className="hidden md:block w-[38%]">
                <Navbar side={true} />
            </aside>
            <main className='w-full md:w-[62%]'>
                <h2><span className='font-bold'>Record Details for ID:</span> {consID}</h2>
                {/* <pre>{JSON.stringify(records, null, 2)}</pre> */}
                {records.map((rec) => (
                    <section key={rec.id} className='my-3 p-5 rounded-2xl border-2 border-slate-200'>
                        {rec.type == "note" && (
                            <div className='space-y-5'>
                                <div className="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--phr)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-time"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M15 3v4" /><path d="M7 3v4" /><path d="M3 11h16" /><path d="M18 16.496v1.504l1 1" /></svg>
                                    {formatDate(rec.date)}
                                </div>
                                <ul className='space-y-2 ml-7'>
                                    {rec.note.map((note, index) => (
                                        <li key={index}>- {note}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {rec.type == "lab" && (
                            <div className='space-y-5'>
                                <div className="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--phr)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-time"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M15 3v4" /><path d="M7 3v4" /><path d="M3 11h16" /><path d="M18 16.496v1.504l1 1" /></svg>
                                    {formatDate(rec.date)}
                                </div>
                                {Object.keys(rec.data).map((field, index) => (
                                    <div key={index}>
                                        <LabValueBar type={field} value={rec.data[field]} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </main>
            
        </div>
    );
}