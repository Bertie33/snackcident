"use client";
import {useFamilyContext} from "@/contexts/FamilyProvider";
import {AddNewMember} from "@/components/FamilySettings/AddNewMember";
import {AddFamilyName} from "@/components/FamilySettings/AddFamilyName";
import {DeleteFamilyMember} from "@/components/FamilySettings/DeleteFamilyMember";
import {ChangeFamilyMember} from "@/components/FamilySettings/ChangeFamilyMember";
import {CalorieCalculator} from "@/components/FamilySettings/CalorieCalculator";


export function FamilySettings() {

    const {state} = useFamilyContext();

    return (
        <div className="flex flex-col items-center m-8 gap-4">
            <h1 className="text-4xl font-bold">
                {state.familyName ? `${state.familyName} Family` : "My Family"}
            </h1>
            <p className="flex flex-col items-center m-3 gap-4">
                {state.familyMembers.map(member => member.name).join(", ")}
            </p>
            <div className="grid gap-2">
                <AddNewMember/>
                <CalorieCalculator/>
                <ChangeFamilyMember/>
                <DeleteFamilyMember/>
                <AddFamilyName/>
            </div>
        </div>
    )
}