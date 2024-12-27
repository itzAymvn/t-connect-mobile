import { Icon } from "@roninoss/icons"
import { Pressable, View } from "react-native"

import { cn } from "@/lib/cn"
import { useColorScheme } from "@/lib/useColorScheme"
import { COLORS } from "@/theme/colors"

export function ThemeToggle() {
	const { colorScheme, setColorScheme } = useColorScheme()

	const renderIcon = ({ pressed }: { pressed: boolean }) => (
		<View className={cn("px-0.5", pressed && "opacity-50")}>
			<Icon
				namingScheme="sfSymbol"
				name={colorScheme === "dark" ? "moon.stars" : "sun.min"}
				color={colorScheme === "dark" ? COLORS.white : COLORS.black}
			/>
		</View>
	)

	return (
		<View>
			<View className="items-center justify-center">
				<Pressable
					onPress={() => {
						setColorScheme(
							colorScheme === "dark" ? "light" : "dark"
						)
					}}
					className="opacity-80"
				>
					{renderIcon}
				</Pressable>
			</View>
		</View>
	)
}
