"use client"
import {FoodProvider} from "@/contexts/FoodProvider";
import FamilyWeightCard from "@/components/weight-section/FamilyWeightCard";
import WeightChartContent from "@/components/weight-section/WeightChartContent";
import FamilyCard from "@/components/member-section/FamilyCard";
import {useFamilyContext} from "@/contexts/FamilyProvider";
export default function WeightChart() {

    const {state} = useFamilyContext();

    return (
        <FoodProvider>
            <div className="m-10 justify-items-center">
                <WeightChartContent />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 mx-50 gap-2">
                {state.familyMembers.map((member, index) => (
                    <FamilyWeightCard
                        key={member.id}
                        id={member.id}
                        name={member.name}
                        index={index}/>
                ))}
            </div>
        </FoodProvider>

    );
}