import {AddNewFoodToDB} from "@/components/food-database/AddNewFoodToDB";
import {useFoodContext} from "@/contexts/FoodProvider";
import {FoodBarTable} from "@/components/food-database/FoodBarTable";

export default function FoodBarContent() {

    let context = useFoodContext();

    return (
        <div className="flex flex-col justify-center">
            <FoodBarTable/>
            <AddNewFoodToDB/>
        </div>


    )
}