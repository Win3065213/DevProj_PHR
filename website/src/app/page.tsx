import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-auto flex bg-white">
      <aside className="w-[38%] h-screen">
        <Navbar side={true} />
      </aside>
      <main>
        Fill research information here.
      </main>
    </div>
  );
}