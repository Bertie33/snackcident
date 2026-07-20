"use client";

import {FamilyContextType, FamilyMember, FamilyState,} from "@/models/familyModels";
import {createContext, ReactNode, useContext, useEffect, useReducer} from "react";
import FamilyReducer from "@/contexts/FamilyReducer";

const initialFamilyState: FamilyState = {
    familyName: "",
    familyMembers: [],
};

const STORAGE_KEYS = {
    familyName: "family-name",
    familyMembers: "family-members",
};

export const FamilyContext = createContext<FamilyContextType | undefined>(
    undefined
);


export function useFamilyContext() {
    const context = useContext(FamilyContext);

    if (!context) {
        throw new Error("useFamilyContext must be used within FamilyProvider")
    }
    return context
}

function loadInitialState(): FamilyState {
    if (typeof window === "undefined") return initialFamilyState;

    const rawMembers = JSON.parse(localStorage.getItem(STORAGE_KEYS.familyMembers) || "[]");
    return {
        familyName: localStorage.getItem(STORAGE_KEYS.familyName) || "",
        familyMembers: rawMembers.map((m: any) => ({
            ...m,
            weightHistory: new Map(
                Array.isArray(m.weightHistory)
                    ? m.weightHistory
                    : Object.entries(m.weightHistory ?? {})
            ),
            calorieHistory: new Map(
                Array.isArray(m.calorieHistory)
                    ? m.calorieHistory
                    : Object.entries(m.calorieHistory ?? {})
            ),
        })),
    };
}

export function FamilyProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(
        FamilyReducer,
        initialFamilyState,
        loadInitialState
    )

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.familyName, state.familyName);

        const serialisable = state.familyMembers.map(member => ({
            ...member,
            weightHistory: Array.from(member.weightHistory.entries()),
            calorieHistory: Array.from(member.calorieHistory.entries()),
        }));
        localStorage.setItem(STORAGE_KEYS.familyMembers, JSON.stringify(serialisable));
    }, [state]);


    const addMember = (member: FamilyMember) => {
        dispatch({
            type: "ADD_MEMBER",
            payload: member
        })
    }

    const removeMember = (id: string) => {
        dispatch({
            type: "REMOVE_MEMBER",
            payload: { id }
        })
    }

    const changeMember = (id: string, updates: Partial<FamilyMember>) => {
        dispatch({
            type: "CHANGE_MEMBER",
            payload: { id, updates },
        })
    }

    const changeFamilyName = (name:string) => {
        dispatch({
            type: "SET_FAMILY_NAME",
            payload:name})
    }



    const addWeight = (id: string, date: string, weight: number) => {
        const member = state.familyMembers.find(m => m.id === id);
        if (!member) return;
        const newMap = new Map(member.weightHistory);
        newMap.set(date, { weight });
        dispatch({ type: "CHANGE_MEMBER", payload: { id, updates: { weightHistory: newMap } } });
    }

    const deleteWeight = (id: string, date: string) => {
        const member = state.familyMembers.find(m => m.id === id);
        if (!member) return;
        const newMap = new Map(member.weightHistory);
        newMap.delete(date);
        dispatch({ type: "CHANGE_MEMBER", payload: { id, updates: { weightHistory: newMap } } });
    }

    const makeCalorieGoal = (id: string, calorieGoal: number) => {
        const member = state.familyMembers.find(m => m.id === id);
        if (!member) return;
        dispatch({ type: "CHANGE_MEMBER", payload: { id, updates: { calorieGoal } } });
    }


    return (
        <FamilyContext.Provider
            value={{
                state,
                addMember,
                removeMember,
                changeMember,
                changeFamilyName,
                addWeight,
                deleteWeight,
                makeCalorieGoal,
            }}
        >
            {children}
        </FamilyContext.Provider>
    );
}

