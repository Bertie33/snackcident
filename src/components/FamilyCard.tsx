import {Button} from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react"
import { ArrowRightIcon } from "lucide-react"
import {Progress} from "@/components/ui/progress";

export default function FamilyCard() {
    return (
        <div className="flex-wrap p-5 bg-stone-600 bg-contain w-md">
            <div className="flex flex-wrap">
                <h1 className=" text-red-400 p-2">Name Here</h1>
                <Button variant="outline">Add +</Button>
            </div>
            <div className="flex flex-wrap p-3">
                <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowLeftIcon />
                </Button>
                <p className="p-2">Day of the Week</p>
                <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowRightIcon />
                </Button>
            </div>

            <p>Number Bar</p>
            <Progress value={33} />
            <p>Items of food / Calories of food</p>
        </div>

    )
}