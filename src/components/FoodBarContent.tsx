import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {AddNewFoodToDB} from "@/components/AddNewFoodToDB";

export default function FoodBarContent() {
    return (
        <div className="flex flex-col justify-center">
            <Select>
                <SelectTrigger className="drinks">
                    <SelectValue placeholder="Drinks"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="dr-pepper">Dr Pepper</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ingredients"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="tomato">tomato</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Meals"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="mushroom risotto">mushroom risotto</SelectItem>
                </SelectContent>
            </Select>
            <AddNewFoodToDB/>
        </div>


    )
}