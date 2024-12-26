import { View } from "react-native"
import { Stack } from "expo-router"
import { Icon } from "@roninoss/icons"
import { ThemeToggle } from "@/components/nativewindui/ThemeToggle"
import { Text } from "@/components/nativewindui/Text"
import { useContext } from "react"
import { AuthContext } from "@/contexts/authContext"
import { useColorScheme } from "@/lib/useColorScheme"
import { COLORS } from "@/theme/colors"

export default function AuthLayout() {
	const { user } = useContext(AuthContext)
	const { colorScheme, isDarkColorScheme } = useColorScheme()

	return (
		<Stack
			screenOptions={{
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="dashboard"
				options={{
					title: "Dashboard",
					headerRight: () => (
						<View className="flex-row items-center gap-2">
							<Icon
								namingScheme="sfSymbol"
								name="bell"
								size={20}
								color={
									isDarkColorScheme
										? COLORS.white
										: COLORS.black
								}
							/>
							<ThemeToggle />
							<View className="bg-primary/10 h-8 w-8 rounded-full items-center justify-center">
								<Text className="text-primary text-sm font-medium">
									{user?.user.prenom[0]}
									{user?.user.nom[0]}
								</Text>
							</View>
						</View>
					),
				}}
			/>
		</Stack>
	)
}
