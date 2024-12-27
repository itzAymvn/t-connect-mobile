import { CustomDrawerContent } from "@/components/CustomDrawerContent"
import { Text } from "@/components/nativewindui/Text"
import { ThemeToggle } from "@/components/nativewindui/ThemeToggle"
import { AuthContext } from "@/contexts/authContext"
import { useColorScheme } from "@/lib/useColorScheme"
import { COLORS } from "@/theme/colors"
import { Icon } from "@roninoss/icons"
import { Drawer } from "expo-router/drawer"
import { useContext } from "react"
import { View } from "react-native"

export default function DashboardLayout() {
	const { user } = useContext(AuthContext)
	const { isDarkColorScheme } = useColorScheme()

	return (
		<Drawer
			screenOptions={{
				headerShown: true,
				drawerType: "front",
				drawerStyle: {
					backgroundColor: isDarkColorScheme
						? COLORS.black
						: COLORS.white,
				},
			}}
			drawerContent={CustomDrawerContent}
		>
			<Drawer.Screen
				name="dashboard"
				options={{
					title: "Tableau de bord",
					headerRight: () => (
						<View className="flex-row items-center gap-2 pr-4">
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
					drawerLabel: "Tableau de bord",
					drawerIcon: ({ size, color }) => (
						<Icon
							namingScheme="sfSymbol"
							name="house"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Drawer>
	)
}
