import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {SearchIcon} from "lucide-react"
import {AddNewIngredient} from "@/components/AddNewIngredient";
import {AddNewDrink} from "@/components/AddNewDrink";
import {AddNewMeal} from "@/components/AddNewMeal";

export function AddNewFoodToDB() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New</DialogTitle>
                    </DialogHeader>
                    <div className="sm:max-w-[425px]">
                        <Input placeholder="Search"/>
                    </div>
                    <div className="grid gap-4">
                        <AddNewIngredient/>
                        <AddNewDrink/>
                        <AddNewMeal/>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}