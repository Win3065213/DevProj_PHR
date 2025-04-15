import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-auto flex bg-white">
      <aside className="hidden lg:block w-[38%]">
        <Navbar side={true} />
      </aside>
      <main>
        Home page.
      </main>
    </div>
  );
}