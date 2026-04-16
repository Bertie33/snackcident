"use client";
import {useFamilyContext} from "@/contexts/FamilyProvider";
import FamilyCard from "@/components/member-section/FamilyCard";
import {FoodProvider} from "@/contexts/FoodProvider";


export default function Home() {

    const {state} = useFamilyContext();

    return (
        <FoodProvider>
        <div className="m-10 items-center">
            <div className="w-full h-auto flex items-center justify-center gap-2  mx-auto rounded-xl overflow-hidden">
                <div className="flex gap-5 p-10">
                    {state.familyMembers.map((member) => (
                        <FamilyCard key={member.id} name={member.name} />
                    ))}
                </div>
            </div>
        </div>
        </FoodProvider>

    );
}