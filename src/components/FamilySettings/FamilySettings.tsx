"use client";
import {useFamilyContext} from "@/contexts/FamilyProvider";
import {AddNewMember} from "@/components/FamilySettings/AddNewMember";
import {AddFamilyName} from "@/components/FamilySettings/AddFamilyName";


export function FamilySettings() {

    const {state} = useFamilyContext();

    return (
        <div className="flex flex-col items-center m-3 gap-4">
            <h1 className="text-4xl font-bold">
                {state.familyName ? `${state.familyName} Family` : "My Family"}
            </h1>
            <div className="flex gap-x-2">
                <AddNewMember/>
                <AddFamilyName/>
            </div>
        </div>
    )
}