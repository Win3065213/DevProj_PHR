import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="h-auto flex bg-white">
      <aside className="hidden lg:block w-[38%]">
        <Navbar side={true} />
      </aside>
      <main className=" grid md:grid-cols-2 gap-x-5 lg:gap-x-7 gap-y-3
                        mb-5 px-5 py-3 lg:pr-10 lg:w-[62%]">
        <div role="alert" className="md:col-span-2 alert alert-warning grid-rows-2 gap-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="row-span-2 h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>
            <b>Disclaimer:</b> All data presented here is for demonstration purposes only.
          </p>
          <a className="italic underline" href="/about">{"For more information, please see in \"About Project\" page."}</a>
        </div>

        <h1 className="md:col-span-2 font-bold text-center text-3xl my-2">Evaluating Information Management for Usability in Personal Health Record (PHR)</h1>

        <img
          className=" md:row-span-2
                      lg:row-span-1 lg:col-span-2
                      xl:row-span-2 xl:col-span-1
                      shadow-md rounded-2xl w-full max-w-[500px] justify-self-center self-center"
          src="/Home.png"
          draggable={false}
        />

        <section>
          <h2 className="font-semibold text-xl">What is Personal Health Record?</h2>
          <p>A personal health record (PHR) is a system that allows individuals, and their authorized caregivers, to access, manage, and share their health information and medical documents. It is designed to ensure quick access to health data while keeping it private and secure.</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl">What to do in this prototype PHR system?</h2>
          <p>
            Since the research focuses on how to present data, you can just look around and see whether it's easy for you to interprect information displayed in this prototype i.e. vital signs in medical record pages.
          </p>
        </section>

        <section className="md:col-span-2 card border-3 border-slate-200 px-5 py-3">
          Here are the pages you can check out in the prototype:
          <ol className="pl-12 list-decimal">
            <li><b>Home</b> (Current)</li>

            <li>
              <b>Medical Record:</b> Consultations (Click on any consultation to view its recorded information.)

              <div className="pl-5">
                Each consultation may include two types of records:
                <ul className="pl-5 list-disc">
                  <li><b>Note:</b> A summary of the consultation, including patient-reported symptoms and observations.</li>
                  <li><b>Lab:</b> Vital signs recorded during the consultation, such as heart rate and blood pressure.</li>
                </ul>
              </div>
            </li>
            
            <li><b>About Project:</b> Details regarding project</li>

            <li><b>Survey:</b> Link to survey form for project (Will be replaced with research result after completion.)</li>

            <li><b>Personal Info:</b> User's personal information page (containing mock user information, with a customisable timer to automatically delete the data after a set time)</li>
          </ol>
        </section>
      </main>
    </div>
  );
}