import {Calendar, Home, Inbox, Search, Scale} from "lucide-react"
import {Button} from "@/components/ui/button";
import {ButtonGroup} from "@/components/ui/button-group"
import Link from "next/link";

export function Navigation() {
    return (
        <div className="flex justify-center m-3 gap-x-2">
            <ButtonGroup className="hidden sm:flex">
                <Link href="/"><Button variant="outline">Family View</Button></Link>
                <Link href="/food-database"><Button variant="outline">Food Database</Button></Link>
                <Link href="/calendar"><Button variant="outline">Calendar</Button></Link>
                <Link href="/weight-chart"><Button variant="outline">Weight Chart</Button></Link>
            </ButtonGroup>
            <Link href="/account-settings"><Button variant="secondary">Settings</Button></Link>
        </div>

    )
}