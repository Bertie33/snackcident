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

    return {
        familyName: localStorage.getItem(STORAGE_KEYS.familyName) || "",
        familyMembers: JSON.parse(localStorage.getItem(STORAGE_KEYS.familyMembers) || "[]"),
    };
}

export function FamilyProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(
        FamilyReducer,
        initialFamilyState,
        loadInitialState
    )

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.familyName,
            state.familyName
        )
        localStorage.setItem(
            STORAGE_KEYS.familyMembers,
            JSON.stringify(state.familyMembers)
        )

    }, [state])


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


    return (
        <FamilyContext.Provider
            value={{
                state,
                addMember,
                removeMember,
                changeMember,
                changeFamilyName,
            }}
        >
            {children}
        </FamilyContext.Provider>
    );
}

