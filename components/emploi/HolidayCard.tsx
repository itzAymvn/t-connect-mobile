import { Icon } from "@roninoss/icons"
import { View } from "react-native"
import { Text } from "../nativewindui/Text"

export default function HolidayCard({ title }: { title: string }) {
	return (
		<View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 border border-gray-200 dark:border-gray-700">
			<View className="flex-row items-center">
				<Icon
					namingScheme="sfSymbol"
					name="sun.max.fill"
					size={24}
					color="rgb(234 179 8)"
				/>
				<Text className="ml-3 font-bold text-lg text-gray-900 dark:text-white">
					{title}
				</Text>
			</View>
		</View>
	)
}
