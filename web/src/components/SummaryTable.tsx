import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const sumaryDates = generateDatesFromYearBeginning();

const minimumSummaryDateSize = 18 * 7; // 18 weeks

const amountOfDaysToFill = minimumSummaryDateSize - sumaryDates.length;

export function Sumarytable() {
    return(
        <div className="w-full flex ">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {WEEKDAYS.map((weekDay, index) => {
                    return(
                        <div 
                            key={`${weekDay} - ${index}`} 
                            className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold"
                        >
                            {weekDay}
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {sumaryDates.map(date => {
                    return (
                        <HabitDay 
                            key={date.toString()}
                            amount={5} 
                            completed={Math.round(Math.random() * 5)} 
                        />
                    )
                })}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
                    return (
                        <div 
                            key={index} 
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                        />
                    )
                })}
            </div>
        </div>
    );
}