import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {AddNewIngredient} from "@/components/food-database/new-items/AddNewIngredient";
import {AddNewDrink} from "@/components/food-database/new-items/AddNewDrink";
import {AddNewMeal} from "@/components/food-database/new-items/AddNewMeal";

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