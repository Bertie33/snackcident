"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import {cn} from "@/lib/utils";

export function Navigation() {
    const pathname = usePathname()
    const navItems = [
        { href: "/", label: "Family View" },
        { href: "/food-database", label: "Food Database" },
        { href: "/calendar", label: "Calendar" },
        { href: "/weight-chart", label: "Weight Chart" },
        { href: "/account-settings", label: "Settings" },
    ]
    return (
        <div className="flex justify-center m-4">
            <div className="bg-secondary rounded-2xl p-1 flex gap-1 hidden sm:flex">
                {navItems.map(item => (
                    <Link key={item.href} href={item.href}>
                        <button className={cn(
                            "px-4 py-1.5 rounded-xl text-sm font-medium transition-all",
                            pathname === item.href
                                ? "bg-card shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}>
                            {item.label}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}