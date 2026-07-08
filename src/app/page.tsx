"use client";
import {useFamilyContext} from "@/contexts/FamilyProvider";
import FamilyCard from "@/components/member-section/FamilyCard";
import {FoodProvider} from "@/contexts/FoodProvider";


export default function Home() {

    const {state} = useFamilyContext();

    return (
        <FoodProvider>
            <div className="max-w-5xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.familyMembers.map((member, index) => (
                        <FamilyCard
                            key={member.id}
                            id={member.id}
                            name={member.name}
                            index={index}
                            weightHistory={member.weightHistory}
                            calorieHistory={member.calorieHistory}
                            calorieGoal={member.calorieGoal}
                            weightGoal={member.weightGoal}/>
                    ))}
                </div>
            </div>
        </FoodProvider>

    );
}