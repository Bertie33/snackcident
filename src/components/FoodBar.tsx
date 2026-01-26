import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";


export default function SideBar() {
    return (
        <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Drinks" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="dr-pepper">Dr Pepper</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ingredients" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="tomato">tomato</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Meals" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="mushroom risotto">mushroom risotto</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline">Add +</Button>
        </div>

    )
}