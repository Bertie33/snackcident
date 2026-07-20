export type Unit = "g" | "ml"


export type Ingredient ={
    id: string
    name: string
    unit: Unit
    caloriesPer100: number
    deleted: boolean
}

export type MealIngredient = {
    ingredientId: string
    amount: number
}

export type Meal ={
    id: string
    name: string
    portions: number
    caloriesPerPortion?: number
    ingredients: MealIngredient[]
}

export type Drink ={
    id: string
    name: string
    calories: number
}

export type FoodState = {
    drinks: Drink[]
    ingredients: Ingredient[]
    meals: Meal[]
}

export type FoodContextType = {
    state: FoodState

    addDrink: (drink: Drink) => void
    removeDrink: (id: string) => void
    changeDrink: (id: string, updates: Partial<Drink>) => void

    addIngredient: (ingredient: Ingredient) => void
    removeIngredient: (id: string) => void
    changeIngredient: (id: string, updates: Partial<Ingredient>) => void

    addMeal: (meal: Meal) => void
    removeMeal: (id: string) => void
    changeMeal: (id: string, updates: Partial<Meal>) => void
}

export type FoodAction =
    | { type: "HYDRATE"; payload: FoodState }

    | { type: "ADD_DRINK"; payload: Drink }
    | { type: "REMOVE_DRINK"; payload: { id: string } }
    | { type: "CHANGE_DRINK"; payload: { id: string; updates: Partial<Drink> } }

    | { type: "ADD_INGREDIENT"; payload: Ingredient }
    | { type: "REMOVE_INGREDIENT"; payload: { id: string } }
    | { type: "CHANGE_INGREDIENT"; payload: { id: string; updates: Partial<Ingredient> } }

    | { type: "ADD_MEAL"; payload: Meal }
    | { type: "REMOVE_MEAL"; payload: { id: string } }
    | { type: "CHANGE_MEAL"; payload: { id: string; updates: Partial<Meal> } }

    | {
    type: "ADD_INGREDIENT_TO_MEAL"
    payload: {
        mealId: string
        ingredientId: string
        amount: number
    }
}
    | {
    type: "CHANGE_MEAL_INGREDIENT"
    payload: {
        mealId: string
        ingredientId: string
        amount: number
    }
}
    | {
    type: "REMOVE_INGREDIENT_FROM_MEAL"
    payload: {
        mealId: string
        ingredientId: string
    }
}

export type EditTarget = {
    memberId: string;
    memberName: string;
    date: string;
    weight: number;
};

export type EditWeightDialogProps = {
    target: EditTarget | null;
    onClose: () => void;
    onSave: (weight: number) => void;
    onDelete: () => void
};

export type WeightActiveDotProps = {
    cx?: number;
    cy?: number;
    fill?: string;
    stroke?: string;
    value?: number;
    payload: {
        date: number;
    };
};