import {Ingredient, MealIngredient} from "@/models/models";

export function calculateMealCaloriesPerPortion(
    mealIngredients: MealIngredient[],
    allIngredients: Ingredient[],
    portions: number
): number {

    if (portions <= 0) return 0;

    const totalCalories = mealIngredients.reduce((sum, mealIngredient) => {
        const ingredient = allIngredients.find(
            (ing) => ing.id === mealIngredient.ingredientId
        );

        if (!ingredient) return sum;

        const ingredientCalories = (
            mealIngredient.amount / 100) * ingredient.caloriesPer100;
        return sum + ingredientCalories;
    }, 0);

    return Math.round(totalCalories / portions * 10) / 10;
}
