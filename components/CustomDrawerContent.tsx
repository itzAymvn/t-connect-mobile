import { AuthContext } from "@/contexts/authContext"
import { logout } from "@/services/authService"
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer"
import { useContext } from "react"
import { Image, Pressable, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Text } from "./nativewindui/Text"

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	const { bottom } = useSafeAreaInsets()
	const { setUser } = useContext(AuthContext)

	const handleLogout = async () => {
		await logout()
		setUser(null)
	}

	return (
		<View className="flex-1">
			{/* Header */}
			<View className="p-6  mt-6">
				<View className="flex-row items-center justify-between">
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
					<Pressable
						onPress={handleLogout}
						className="w-10 h-10 rounded-full bg-red-500/10 items-center justify-center"
					>
						<Text className="text-red-500 text-lg">⎋</Text>
					</Pressable>
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
