import Navbar from "@/components/navbar";
import { mockConsultations } from "../../utils/mockData/mockConsultations";

export default function Records() {
  // let consultations = [
  //   {
  //     Location: "Sheffield Walk-in Centre",
  //     date: 10 - 3 - 2025,
  //     records: []
  //   },
  //   {
  //     Location: "Sheffield Walk-in Centre",
  //     date: 10 - 3 - 2025,
  //     records: []
  //   },
  //   {
  //     Location: "Sheffield Walk-in Centre",
  //     date: 10 - 3 - 2025,
  //     records: []
  //   }
  // ];
  let consultations = mockConsultations;

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <div className="flex w-dvw">
      <aside className="hidden md:block w-[38%]">
        <Navbar side={true} />
      </aside>
      <main className=" carousel carousel-center
                        before:content-[''] before:min-w-[200px]
                        after:content-[''] after:min-w-[200px]
                        transparent-sides
                        flex max-w-2xl space-x-16
                        mx-auto md:mx-0 mt-3 p-4">
        {consultations.map((cons) => {
          const recordCounts = { note: 0, lab: 0 }; // Initialize counts

          cons.records.forEach(record => {
            if (record.type === 'note') {
              recordCounts.note++;
            } else if (record.type === 'lab') {
              recordCounts.lab++;
            }
            // Add more conditions for other record types if needed
          });

          return (
            <a
              key={cons.id}
              className=" carousel-item flex-col
                          w-80 p-5 rounded-2xl
                          border-2 border-slate-200"
              href={`/record/?id=${cons.id}`}
            >
              <div className="h-36 space-y-2">
                <h2 className="font-bold text-2xl">{cons.name}</h2>

                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--phr)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                  {cons.dr_name}
                </div>

                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--phr)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-map-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" /><path d="M9 4v13" /><path d="M15 7v5.5" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" /><path d="M19 18v.01" /></svg>
                  {cons.location}
                </div>

                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--phr)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-time"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M15 3v4" /><path d="M7 3v4" /><path d="M3 11h16" /><path d="M18 16.496v1.504l1 1" /></svg>
                  {formatDate(cons.date)}
                </div>
              </div>

              <div className=" rounded-md px-5 py-3
                          bg-gray-300">
                <h1 className="text-xl font-semibold mb-2">Number of Records</h1>
                <section className="grid grid-cols-2 divide-x-2 divide-slate-100">
                  <div className="flex flex-col items-center">
                    <label className="text-lg text-[var(--phr)] font-semibold">Note</label>
                    <p className="text-5xl font-bold">{recordCounts.note}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-lg text-[var(--phr)] font-semibold">Lab</label>
                    <p className="text-5xl font-bold">{recordCounts.lab}</p>
                  </div>
                </section>
                {/* {cons.records.map((rec) => (
                  <div key={rec.id}>
                    <h2 className="font-bold">{formatDate(rec.date)}</h2>
                  </div>
                ))} */}
              </div>
            </a>
          )
        })}
      </main>
    </div>
  );
}