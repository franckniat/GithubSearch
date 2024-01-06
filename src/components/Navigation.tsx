import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const {theme, setTheme} = useTheme();
    const pathname = usePathname();
    return (
    <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/70 dark:bg-neutral-950/70 border-b border-slate-100 dark:border-neutral-700 z-[20]">
        <section className="max-w-[700px] mx-auto px-2">
            <section className="flex items-center justify-between h-[65px]">
                <Link href="/" className="font-bold text-xl">Github API</Link>
                <div className="flex gap-1">
                    <Link href="/" className={`px-2 hover:text-sky-600 ${pathname === "/" ? "text-sky-600" : ""}`}>Home</Link>
                    <Link href="/users" className={`px-2 hover:text-sky-600 ${pathname === "/users" ? "text-sky-600" : ""}`}>Users</Link>
                    <Link href="/repos" className={`px-2 hover:text-sky-600 ${pathname === "/repos" ? "text-sky-600" : ""}`}>Repos</Link>
                    <Link href="/orgs" className={`px-2 hover:text-sky-600 ${pathname === "/orgs" ? "text-sky-600" : ""}`}>Organizations</Link>
                </div>
                <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 group" onClick={()=>{setTheme(theme === "dark" ? "light":"dark")}}>
                    <SunMedium size={20} className="absolute scale-100 dark:scale-0 rotate-90 dark:rotate-0 transition-all group-hover:text-sky-600"/>
                    <Moon size={20} className="scale-0 dark:scale-100 rotate-45 dark:rotate-0 transition-all group-hover:text-sky-600"/>
                </button>
            </section>
        </section>
    </nav>
  )
}
