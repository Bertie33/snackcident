import FoodBar from "@/components/food-database/FoodBar";
import {FoodProvider} from "@/contexts/FoodProvider";
export default function FoodDatabase() {
    return (
        <FoodProvider>
            <div>
                <FoodBar/>
            </div>
        </FoodProvider>
    );
}