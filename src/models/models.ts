export interface Meal{
    id: string;
    name: string;
    portions: number;
    calories: string;
    ingredients: Ingredient[];
}

export interface Drink{
    id: string;
    name: string;
    calories: string;
}

export interface Ingredient{
    id: string;
    name: string;
    unit: string;
    calories: string;
}