import { Calendar, Home, Inbox, Search, Scale } from "lucide-react"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export function Navigation() {
    return (
        <div className="flex flex-col">
            <Link href="/"><Button variant="outline">Family View</Button></Link>
            <Link href="/calendar"><Button variant="outline">Calendar</Button></Link>
            <Link href="/weight-chart"><Button variant="outline">Weight Chart</Button></Link>
        </div>

    )
}