import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button } from "./nativewindui/Button"
import { logout } from "@/services/authService"
import { router } from "expo-router"
import { Image, View } from "react-native"
import { Text } from "./nativewindui/Text"

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	const { bottom } = useSafeAreaInsets()

	const handleLogout = async () => {
		await logout()
		router.replace("/")
	}

	return (
		<View className="flex-1">
			{/* Header */}
			<View className="p-6 border-b border-border mt-6">
				<View className="flex-row items-center gap-4">
					<Image
						source={{
							uri: `${process.env.EXPO_PUBLIC_BASE_URL}/assets/images/logo.png`,
						}}
						className="w-16 h-16"
						resizeMode="contain"
					/>
					<View>
						<Text
							variant="title2"
							className="font-bold text-foreground"
						>
							T-CONNECT
						</Text>
						<Text variant="subhead" color="tertiary">
							Portail parent
						</Text>
					</View>
				</View>
			</View>

			<DrawerContentScrollView
				{...props}
				className="flex-1"
				contentContainerStyle={{
					paddingTop: 0,
				}}
			>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			{/* Footer */}
			<View
				className="p-6 border-t border-border"
				style={{ paddingBottom: Math.max(bottom, 16) }}
			>
				<View className="gap-4">
					<Button
						size="lg"
						className="w-full h-14 rounded-xl shadow-sm bg-red-500"
						onPress={handleLogout}
					>
						<Text className="font-semibold text-white">
							Se déconnecter
						</Text>
					</Button>

					<Text
						variant="footnote"
						color="tertiary"
						className="text-center"
					>
						© 2024{" "}
						<Text variant="footnote" className="underline">
							MJTech
						</Text>
						. Tous droits réservés.
					</Text>
				</View>
			</View>
		</View>
	)
}
