import FamilyCard from "@/components/FamilyCard";
import NavBar from "@/components/FoodBar";
import {Navigation} from "@/components/Navigation";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-wrap">
            <div className="flex-col">
                <Navigation/>
                <p className="p-3">...</p>
                <NavBar/>
            </div>
            <FamilyCard/>


        </div>
    );
}