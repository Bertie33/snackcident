import {Button} from "@/components/ui/button";
import {ArrowLeftIcon} from "lucide-react"
import {ArrowRightIcon} from "lucide-react"
import {Trash} from "lucide-react"
import {Progress} from "@/components/ui/progress";
import {AddingFoodToUser} from "@/components/member-section/AddingFoodToUser";

export default function FamilyCard() {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg px-10 py-10">
            <div className="">
                <div className="flex">
                    <h1 className="font-bold text-xl m-2 mr-10">Name Here</h1>
                    <AddingFoodToUser/>
                </div>
                <div className="flex flex-wrap p-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowLeftIcon/>
                    </Button>
                    <p className="p-2">Day of the Week</p>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowRightIcon/>
                    </Button>

                </div>
            </div>
            <p>Calories Left</p>
            <Progress value={33}/>
            <div className="p-2 flex ">
                <p className="p-2">Item of food</p>
                <p className="p-2">100 kcal</p>
                <Trash/>
            </div>

        </div>

    )
}