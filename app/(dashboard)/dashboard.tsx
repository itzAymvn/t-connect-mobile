import { Text } from "@/components/nativewindui/Text"
import { View, ScrollView, Pressable } from "react-native"
import { Icon } from "@roninoss/icons"
import { useRouter } from "expo-router"
import { useColorScheme } from "@/lib/useColorScheme"
import { memo, useMemo } from "react"

const MenuItem = memo(
	({
		id,
		label,
		icon,
		route,
		onPress,
		isDarkColorScheme,
	}: {
		id: string
		label: string
		icon: string
		route: string
		onPress: () => void
		isDarkColorScheme: boolean
	}) => (
		<Pressable
			key={id}
			onPress={onPress}
			className="w-[45%] aspect-square bg-white dark:bg-gray-800 rounded-xl mb-4 items-center justify-center shadow-sm"
		>
			<Icon
				name={"calendar-month"}
				size={32}
				color={isDarkColorScheme ? "#9ca3af" : "#6b7280"}
			/>
			<Text
				variant="subhead"
				className="mt-3 text-center text-gray-600 dark:text-gray-400"
			>
				{label}
			</Text>
		</Pressable>
	)
)

MenuItem.displayName = "MenuItem"

export default function Dashboard() {
	const router = useRouter()
	const { isDarkColorScheme } = useColorScheme()

	const menuItems = useMemo(
		() => [
			{
				id: "schedule",
				label: "Emploi",
				icon: "calendar",
				route: "/(dashboard)/emploi" as const,
			},
		],
		[]
	)

	return (
		<ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
			<View className="flex-row flex-wrap justify-between p-4">
				{menuItems.map((item) => (
					<MenuItem
						key={item.id}
						{...item}
						onPress={() => router.push(item.route)}
						isDarkColorScheme={isDarkColorScheme}
					/>
				))}
			</View>
		</ScrollView>
	)
}
