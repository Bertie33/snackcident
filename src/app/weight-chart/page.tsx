import {FoodProvider} from "@/contexts/FoodProvider";
import WeightChartContent from "@/components/weight-section/WeightChartContent";
export default function WeightChart() {


    return (
        <FoodProvider>
            <div className="m-10 justify-items-center">
                <WeightChartContent />
            </div>
        </FoodProvider>
    );
}