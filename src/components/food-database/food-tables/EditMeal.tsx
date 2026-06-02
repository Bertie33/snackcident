import {useState} from "react";
import {useFood, useFoodContext, UserError} from "@/contexts/FoodProvider";
import {DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {calculateMealCaloriesPerPortion} from "@/utils/calculateCalories";
import {MealComboBox} from "@/components/food-database/new-items/MealComboBox";
import {AddNewIngredient} from "@/components/food-database/new-items/AddNewIngredient";


export default function EditMeal({id, close}: { id: string; close: () => void }) {

    let {state} = useFoodContext();
    const {changeMeal} = useFood();
    const [addIngredientOpen, setAddIngredientOpen] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; portions?: string }>({});

    let item = state.meals.find((i) => i.id === id);

    if (!item) {
        return null;
    }

    const [meal, setMeal] = useState({
        name: item.name,
        portions: item.portions,
        ingredients: item.ingredients
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setMeal((prev) => ({
            ...prev,
            [name]: name === "portions" ? Number(value) : value,
        }));
    }

    const handleAddIngredient = (ingredientId: string) => {
        if (meal.ingredients.some(i => i.ingredientId === ingredientId)) {
            console.log("Ingredient already exists");
            return;
        }

        setMeal(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, {ingredientId, amount: 100}]
        }));
    };

    const handleAmountChange = (ingredientId: string, amount: number) => {
        setMeal(prev => ({
            ...prev,
            ingredients: prev.ingredients.map(i =>
                i.ingredientId === ingredientId ? {...i, amount} : i
            )
        }));
    };

    const handleRemoveIngredient = (ingredientId: string) => {
        setMeal(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter(i => i.ingredientId !== ingredientId)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const caloriesPerPortion = calculateMealCaloriesPerPortion(
            meal.ingredients,
            state.ingredients,
            meal.portions
        );
        try {
            changeMeal(id, {
                name: meal.name,
                portions: meal.portions,
                ingredients: meal.ingredients,
                caloriesPerPortion: caloriesPerPortion
            });
            close();
        } catch (error: any) {
            if (error instanceof UserError)
                setErrors(error.newUserErrors)
        }


    };


    return (
        <div>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit {item.name}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Meal Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={meal.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label>Ingredients</Label>
                            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                                {meal.ingredients.length === 0 && (
                                    <span className="text-sm text-muted-foreground">
                                        No ingredients added
                                    </span>
                                )}

                                {meal.ingredients.map((mi) => {
                                    const details = state.ingredients.find(
                                        i => String(i.id) === String(mi.ingredientId)
                                    );

                                    return (
                                        <div
                                            key={mi.ingredientId}
                                            className="flex items-center gap-2 border-b pb-2 min-w-0"
                                        >
                                            <span className="flex-1 font-medium">
                                                {details?.name}
                                            </span>

                                            <Input
                                                type="number"
                                                className="w-20"
                                                value={mi.amount}
                                                onChange={(e) =>
                                                    handleAmountChange(
                                                        mi.ingredientId,
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />

                                            <span className="text-sm text-muted-foreground">
                                                {details?.unit}
                                            </span>


                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleRemoveIngredient(mi.ingredientId)
                                                }
                                            >
                                                Remove
                                            </Button>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        <div className="grid gap-2">
                            <Label>Add Ingredient</Label>
                            <MealComboBox onSelect={handleAddIngredient}/>
                        </div>


                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setAddIngredientOpen(true)}
                        >
                            Add New Ingredient
                        </Button>

                        <div className="grid gap-2">
                            <Label htmlFor="portions">Portions</Label>
                            <Input
                                id="portions"
                                type="number"
                                name="portions"
                                value={meal.portions}
                                onChange={handleChange}
                            />
                            {errors.portions && <p className="text-red-500 text-sm">{errors.portions}</p>}
                        </div>

                        {meal.portions > 0 && meal.ingredients.length > 0 && (
                            <div className="p-4 bg-muted rounded-md">
                                <Label className="text-sm text-muted-foreground">Calories per Portion</Label>
                                <div className="text-2xl font-semibold mt-1">
                                    {calculateMealCaloriesPerPortion(
                                        meal.ingredients,
                                        state.ingredients,
                                        meal.portions
                                    )} cal
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
            <AddNewIngredient
                open={addIngredientOpen}
                onClose={() => setAddIngredientOpen(false)}
            />
        </div>
    )
}