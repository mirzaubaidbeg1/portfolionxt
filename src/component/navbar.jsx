import Link from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link>Home</Link>
      <Link>About</Link>
    </div>
  );
}