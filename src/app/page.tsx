import FamilyCard from "@/components/FamilyCard";
import NavBar from "@/components/FoodBar";
import {Navigation} from "@/components/Navigation";
import Link from "next/link";
import FoodBar from "@/components/FoodBar";

export default function Home() {
    return (
        <div className="m-10">
            <div className="">
                <FoodBar/>
            </div>
            <div className="w-full h-auto flex items-center justify-center gap-2  mx-auto rounded-xl overflow-hidden">
                <div className="flex gap-5 p-10">
                    <FamilyCard/>
                    <FamilyCard/>
                </div>
            </div>
        </div>


    );
}