import {AddNewFoodToDB} from "@/components/food-database/AddNewFoodToDB";
import {IngredientBarTable} from "@/components/food-database/food-tables/IngredientBarTable";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {DrinkBarTable} from "@/components/food-database/food-tables/DrinkBarTable";
import {MealBarTable} from "@/components/food-database/food-tables/MealBarTable";
import {accentColors, gradients} from "@/models/Colours";


export default function FoodBarContent() {

    const tabColors = [
        { gradient: gradients[0], accent: accentColors[0] },
        { gradient: gradients[1], accent: accentColors[1] },
        { gradient: gradients[2], accent: accentColors[2] },
    ]

    return (
        <div className="w-full mx-auto">
            <Tabs defaultValue="ingredients" className="flex flex-col w-full max-w-3xl mx-auto">
                <TabsList className="w-fit ">
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="drinks">Drinks</TabsTrigger>
                    <TabsTrigger value="meals">Meals</TabsTrigger>
                </TabsList>

                <TabsContent value="ingredients" className="w-full">
                    <div className={`bg-gradient-to-br ${tabColors[0].gradient} rounded-2xl shadow-sm p-5`}>
                        <div className={`${tabColors[0].accent} h-1 rounded-full mb-4`} />
                        <h2 className="font-bold text-xl mb-4">Ingredients</h2>
                        <IngredientBarTable/>
                    </div>
                </TabsContent>

                <TabsContent value="drinks">
                    <div className={`bg-gradient-to-br ${tabColors[1].gradient} rounded-2xl shadow-sm p-5`}>
                        <div className={`${tabColors[1].accent} h-1 rounded-full mb-4`} />
                        <h2 className="font-bold text-xl mb-4">Drinks</h2>
                        <DrinkBarTable/>
                    </div>
                </TabsContent>

                <TabsContent value="meals">
                    <div className={`bg-gradient-to-br ${tabColors[2].gradient} rounded-2xl shadow-sm p-5`}>
                        <div className={`${tabColors[2].accent} h-1 rounded-full mb-4`} />
                        <h2 className="font-bold text-xl mb-4">Meals</h2>
                        <MealBarTable/>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="justify-items-center m-10">
                <AddNewFoodToDB/>
            </div>
        </div>
    )
}


