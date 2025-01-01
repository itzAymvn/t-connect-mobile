import { CustomDrawerContent } from "@/components/CustomDrawerContent"
import { Text } from "@/components/nativewindui/Text"
import { ThemeToggle } from "@/components/nativewindui/ThemeToggle"
import { AuthContext } from "@/contexts/authContext"
import { useSelectedChild } from "@/contexts/childContext"
import { useColorScheme } from "@/lib/useColorScheme"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Icon } from "@roninoss/icons"
import { useRouter } from "expo-router"
import { Drawer } from "expo-router/drawer"
import { useContext } from "react"
import { Pressable, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function DashboardLayout() {
	const { user } = useContext(AuthContext)
	const { isDarkColorScheme } = useColorScheme()
	const { selectedChild } = useSelectedChild()
	const router = useRouter()

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<Drawer
					screenOptions={{
						headerShown: true,
						drawerType: "slide",
						drawerStyle: {
							backgroundColor: isDarkColorScheme
								? "rgb(17 24 39)"
								: "rgb(249 250 251)",
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
							title: selectedChild?.prenom,
							drawerLabel: selectedChild?.prenom,
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
							title: selectedChild?.prenom,
							drawerLabel: selectedChild?.prenom,
							drawerIcon: ({ size, color }) => (
								<Icon
									namingScheme="sfSymbol"
									name="calendar"
									size={size}
									color={color}
								/>
							),
							headerLeft: (props) => (
								<View className="flex-row items-center gap-3 px-3">
									<Pressable
										onPress={() => router.back()}
										className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center"
									>
										<Icon
											namingScheme="sfSymbol"
											name="chevron.left"
											size={18}
											color={
												isDarkColorScheme
													? "rgb(255 255 255)"
													: "rgb(17 24 39)"
											}
										/>
									</Pressable>
								</View>
							),
						}}
					/>
				</Drawer>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}
