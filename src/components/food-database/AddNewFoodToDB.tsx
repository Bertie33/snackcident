"use client"

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
import {useState} from "react";

export function AddNewFoodToDB() {

    const [ingredientOpen, setIngredientOpen] = useState(false);

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
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                        <Button onClick={() => setIngredientOpen(true)}>Add New Ingredient</Button>
                        <AddNewIngredient
                            open={ingredientOpen}
                            onClose={() => setIngredientOpen(false)}
                        />
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