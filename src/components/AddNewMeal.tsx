"use client"

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

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {MealComboBox} from "@/components/MealComboBox";


export function AddNewMeal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New Meal</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Meal</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="item-1">Meal: </Label>
                            <Input id="ingredient-1" name="drink" defaultValue=""/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="quantity-1">Ingredients</Label>
                            <div className="sm:max-w-[425px]">
                                <MealComboBox/>
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="servings-1">Serves</Label>
                            <Input id="servings-1" name="servings" defaultValue=""/>
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit">Add</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}