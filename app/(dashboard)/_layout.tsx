import { CustomDrawerContent } from "@/components/CustomDrawerContent"
import { Text } from "@/components/nativewindui/Text"
import { ThemeToggle } from "@/components/nativewindui/ThemeToggle"
import { AuthContext } from "@/contexts/authContext"
import { useColorScheme } from "@/lib/useColorScheme"
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
				drawerType: "slide",
				drawerStyle: {
					backgroundColor: isDarkColorScheme
						? "rgb(17 24 39)" // bg-gray-900
						: "rgb(249 250 251)", // bg-gray-50
				},
				headerRight: () => (
					<View className="flex-row items-center gap-2 pr-4">
						<Icon
							namingScheme="sfSymbol"
							name="bell"
							size={20}
							color={
								isDarkColorScheme
									? "rgb(255 255 255)"
									: "rgb(17 24 39)"
							}
						/>
						<ThemeToggle />
						<View className="bg-gray-100 dark:bg-gray-700 h-8 w-8 rounded-full items-center justify-center">
							<Text className="text-gray-900 dark:text-white text-sm font-medium">
								{user?.user.prenom[0]}
								{user?.user.nom[0]}
							</Text>
						</View>
					</View>
				),
			}}
			drawerContent={CustomDrawerContent}
		>
			<Drawer.Screen
				name="dashboard"
				options={{
					title: "Tableau de bord",
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
			<Drawer.Screen
				name="emploi"
				options={{
					title: "Emploi",
					drawerLabel: "Emploi du temps",
					drawerIcon: ({ size, color }) => (
						<Icon
							namingScheme="sfSymbol"
							name="calendar"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Drawer>
	)
}
