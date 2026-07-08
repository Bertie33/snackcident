import {gradients} from "@/models/Colours";
import {AddingWeightToUser} from "@/components/member-section/AddingWeightToUser";


export default function FamilyWeightCard({ name, index, id,}: { name: string, index: number, id: string })  {
    const gradient = gradients[index % gradients.length]

    return (
        <div className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-sm p-3`}>
            <div className="font-bold text-xl ">
                <h1>{name}</h1>
            </div>
            <div className="flex items-center justify-left gap-3 m-4">
                <AddingWeightToUser name={name} id={id} />
            </div>
        </div>
    )
}