import { Check } from "phosphor-react";
import * as CheckBox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const AVAILABLE_WEEK_DAYS = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

export  function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<Number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault();
        
        if (!title || weekDays.length === 0 ) {
            return
        }
        
        await api.post('habits', {
            title,
            weekDays
        })

        setTitle('');
        setWeekDays([]);

        alert('Hábito Criado com Sucesso!')
    }

    function handleToogleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay);
            setWeekDays(weekDaysWithRemovedOne);
        } else {
            const weekDaysWithAddOne = [...weekDays, weekDay];
            setWeekDays(weekDaysWithAddOne);
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label 
                htmlFor="title"
                className="font-semibold leading-tight">
                    Qual seu comprometimento
            </label>
            <input
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem,eetc..."
                autoFocus
                value={title}
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                onChange={event => setTitle(event.target.value)}
            />
            <label
                htmlFor=""
                className="font-semibold leading-tight mt-4"
            >
                Qual a Recorrência?
            </label>
            <div className='mt-3 flex flex-col gap-1'>
                {
                    AVAILABLE_WEEK_DAYS.map((weekDay, index) => 
                        <CheckBox.Root
                            className='flex items-center gap-3 group'
                            checked={weekDays.includes(index)}
                            key={weekDay}
                            onCheckedChange={() => handleToogleWeekDay(index)}
                        >
                            <div className='h-8 w-8 flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 rounded-lg'>
                                <CheckBox.Indicator>
                                    <Check size={20} className='text-white ' />
                                </CheckBox.Indicator>
                            </div>
                            <span className='text-white leading-tight'>
                                {weekDay}
                            </span>
                        </CheckBox.Root>
                    )
                }
            </div>
            <button 
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500"
            >
                <Check 
                    size={20}
                    weight="bold"
                />
                Confirmar
            </button>
        </form>
    )
}