import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-auto flex bg-white">
      <aside className="hidden lg:block w-[38%]">
        <Navbar side={true} />
      </aside>
      <main className=" grid md:grid-cols-2 gap-x-7 gap-y-3
                        mb-5 px-5 py-3 lg:pr-10 lg:w-[62%]">
        <h1 className="md:col-span-2 font-bold text-center text-3xl my-2">About this project</h1>

        <section className="md:col-span-2">
          <h2 className="font-semibold text-xl">Project Overview</h2>
          <p>This prototype is part of a research project focused on evaluating the information management aspect in personal health records (PHRs). The aim is to enhance patient engagement, safety and health outcomes by identifying effective ways to present medical information to users.</p>
        </section>

        <img
          className="md:col-span-2 shadow-md rounded-2xl w-full max-w-[500px] justify-self-center"
          src="/About.png"
          draggable={false}
        />
        
        <section>
          <h2 className="font-semibold text-xl">Purpose of the Prototype</h2>
          <p>This prototype PHR system was developed to investigate effective ways of presenting personal health data. It aims to support research into how users interpret medical information, with a focus on improving clarity and comprehension.</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl">Disclaimer</h2>
          <p>All data presented in this prototype is generated for research and demonstration purposes only. No real patient records are used. The interface is not intended for clinical or diagnostic use. Mock data will be stored on your device and automatically deleted after a set duration.</p>
        </section>
      </main>
    </div>
  );
}