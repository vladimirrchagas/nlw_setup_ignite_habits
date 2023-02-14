import { useEffect, useState } from "react";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const sumaryDates = generateDatesFromYearBeginning();

const minimumSummaryDateSize = 18 * 7; // 18 weeks

const amountOfDaysToFill = minimumSummaryDateSize - sumaryDates.length;

type Summary = {
    id: string;
    date: string;
    ammount: number;
    completed: number;
}[]

export function Sumarytable() {
    const [summary, setSummary] = useState<Summary>([]);

    useEffect(() => {
        api.get('summary')
            .then(response => {
                console.log(response.data)
                setSummary(response.data)
            })
    }, [])

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
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day');
                    });

                    return (
                        <HabitDay 
                            key={date.toString()}
                            date={date}
                            amount={dayInSummary?.ammount} 
                            completed={dayInSummary?.completed}
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