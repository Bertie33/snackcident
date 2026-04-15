import FoodBar from "@/components/food-database/FoodBar";
import {FoodProvider} from "@/contexts/FoodProvider";
import FoodBarContent from "@/components/food-database/FoodBarContent";

export default function FoodDatabase() {
    return (
        <FoodProvider>
            <div className="max-w-3xl mx-auto">
                <FoodBar/>
            </div>
        </FoodProvider>
    );
}