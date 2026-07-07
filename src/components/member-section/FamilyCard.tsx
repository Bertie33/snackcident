import {Button} from "@/components/ui/button";
import {ArrowLeftIcon, ArrowRightIcon, Trash} from "lucide-react"
import {Progress} from "@/components/ui/progress";
import {AddingFoodToUser} from "@/components/member-section/AddingFoodToUser";
import {accentColors, avatarColors, gradients} from "@/models/Colours";
import {AddingWeightToUser} from "@/components/member-section/AddingWeightToUser";


export default function FamilyCard({ name, index, id }: { name: string, index: number, id: string })  {
    const gradient = gradients[index % gradients.length]
    const avatarColor = avatarColors[index % avatarColors.length]
    const accentColor = accentColors[index % accentColors.length]

    return (
        <div className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-sm p-5`}>

            <div className="font-bold text-xl gap-3 mb-4">
                <h1>{name}</h1>
            </div>
            <div className={`${accentColor} h-1 rounded-full mb-4`} />
            <div className="flex items-center justify-center gap-3 mb-4">
                <AddingWeightToUser name={name} id={id} />
                <AddingFoodToUser />
            </div>

            <div className="flex items-center gap-2 mb-4 mx-15">
                <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowLeftIcon/>
                </Button>
                <p className="text-sm">Monday</p>
                <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowRightIcon/>
                </Button>
            </div>

            <div className="mb-4">
                <p className="text-4xl font-bold text-health-orange">1,340</p>
                <p className="text-xs text-muted-foreground">kcal remaining</p>
            </div>

            <Progress value={33}/>

            <div className="mt-3 flex flex-col">
                <div className="flex justify-between items-center py-2 border-b border-border text-sm last:border-0">
                    <p>Item of food</p>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">100 kcal</span>
                        <Trash className="h-4 w-4 text-destructive"/>
                    </div>
                </div>
            </div>
        </div>
    )
}