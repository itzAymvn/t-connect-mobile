import { Pressable } from "react-native"
import { ScrollView } from "react-native"
import { Text } from "../nativewindui/Text"

export default function DaySelector({
	days,
	selectedDay,
	onSelectDay,
}: {
	days: string[]
	selectedDay: string
	onSelectDay: (day: string) => void
}) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="mb-4"
		>
			{days.map((day) => (
				<Pressable
					key={day}
					onPress={() => onSelectDay(day)}
					className={`mr-2 px-6 py-3 rounded-lg border ${
						selectedDay === day
							? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
							: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
					}`}
				>
					<Text
						className={`font-medium ${
							selectedDay === day
								? "text-white dark:text-gray-900"
								: "text-gray-900 dark:text-white"
						}`}
					>
						{day}
					</Text>
				</Pressable>
			))}
		</ScrollView>
	)
}
