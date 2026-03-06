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
import {MealComboBox} from "@/components/food-database/new-items/MealComboBox";
import {AddNewIngredient} from "@/components/food-database/new-items/AddNewIngredient";
import {useFood} from "@/contexts/FoodProvider";
import {useState} from "react";
import {Ingredient} from "@/models/models";
import {v4 as uuid} from "uuid";


export function AddNewMeal() {

    const {addMeal} = useFood();

    const [item, setItem] = useState({
        name: "",
        portions: 0,
        calories: "",
        ingredients:[],
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;

        setItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMeal({
            id: uuid(),
            name: item.name,
            portions: item.portions,
            ingredients: item.ingredients,
        });



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
                            <Label htmlFor="ingredients-1">Ingredients</Label>
                            <div className="sm:max-w-[425px]">
                                <MealComboBox/>
                            </div>
                        </div>
                        <AddNewIngredient/>
                        <div className="grid gap-3">
                            <Label htmlFor="servings-1">Serves</Label>
                            <Input id="servings-1" name="servings" defaultValue=""/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}}