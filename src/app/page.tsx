import FamilyCard from "@/components/FamilyCard";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function Home() {
    return (
        <div>
            <h1 className="text-3xl font-bold">
                Family View
            </h1>
            <NavBar />
            <SideBar />
            <FamilyCard/>

        </div>
    );
}