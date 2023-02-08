import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const AVAILABLE_WEEK_DAYS = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

export function New () {
    const  [weekDays, setWeekDays ] = useState<number[]>([])

    function handleToogleWeekDay(weekDayIndex: number) {
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay =>  weekDay !== weekDayIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />
                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900  text-white border-zinc-800 border-2 focus:border-green-600"
                    placeholder="Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                />

                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual a recorrência?
                </Text>

                {
                    AVAILABLE_WEEK_DAYS.map((weekDay, index) => (
                        <Checkbox
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleToogleWeekDay(index)}
                        />
                    ))
                }

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}