
export type FamilyState ={
    familyName: string
    familyMembers: FamilyMember[]
}

export type CalendarDay = string;

export type FamilyMember = {
    id: string
    name:string
    weightHistory: Map<CalendarDay,WeightEntry>
    calorieHistory: Map<CalendarDay,CalorieEntry>
}

export type WeightEntry = {
    weight: number;
};

export type CalorieEntry = {
    items: FoodLog[];
}

export type FoodLog = {
    foodId: string;
    amount: number;
};

export type FamilyContextType = {
    state: FamilyState

    addMember: (member: FamilyMember) => void
    removeMember: (id: string) => void
    changeMember: (id: string, updates: Partial<FamilyMember>) => void
    changeFamilyName: (name:string) => void

}

export type FamilyAction =
    | { type: "HYDRATE"; payload: FamilyState }
    | { type: "ADD_MEMBER"; payload: FamilyMember }
    | { type: "REMOVE_MEMBER"; payload: { id: string } }
    | { type: "CHANGE_MEMBER"; payload: { id: string; updates: Partial<FamilyMember> } }
    | { type: "SET_FAMILY_NAME"; payload: string};
