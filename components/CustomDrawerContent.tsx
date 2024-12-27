import { AuthContext } from "@/contexts/authContext"
import { ChildContext } from "@/contexts/childContext"
import { logout } from "@/services/authService"
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer"
import { useContext } from "react"
import { Image, Pressable, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Picker, PickerItem } from "./nativewindui/Picker"
import { Text } from "./nativewindui/Text"
import { Child } from "@/types"

const DrawerHeader = ({ handleLogout }: { handleLogout: () => void }) => {
	return (
		<View className="p-6 mt-6">
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
					<Text className="text-red-500">×</Text>
				</Pressable>
			</View>
		</View>
	)
}

const DrawerFooter = ({
	selectedChild,
	setSelectedChild,
}: {
	selectedChild: Child | null
	setSelectedChild: (child: Child | null) => void
}) => {
	const { user } = useContext(AuthContext)
	const { bottom } = useSafeAreaInsets()
	return (
		<View
			className="p-6 border-t border-border"
			style={{ paddingBottom: Math.max(bottom, 16) }}
		>
			<View className="gap-4">
				{/* Child Selection */}
				{user?.children && user.children.length > 0 && (
					<View className="flex-row items-center gap-2">
						<Text variant="footnote" color="tertiary">
							Enfant :
						</Text>
						<View className="flex-1">
							<Picker
								selectedValue={selectedChild?.id}
								onValueChange={(childId) => {
									const child = user.children.find(
										(c) => c.id === childId
									)
									if (child) setSelectedChild(child)
								}}
								className="text-foreground bg-gray-100 dark:bg-gray-700"
							>
								{user.children.map((child) => (
									<PickerItem
										key={child.id}
										label={child.prenom}
										value={child.id}
									/>
								))}
							</Picker>
						</View>
					</View>
				)}
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
	)
}

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	const { setUser } = useContext(AuthContext)
	const { selectedChild, setSelectedChild } = useContext(ChildContext)

	const handleLogout = async () => {
		await logout()
		setUser(null)
	}

	return (
		<View className="flex-1">
			<DrawerHeader handleLogout={handleLogout} />

			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			<DrawerFooter
				selectedChild={selectedChild}
				setSelectedChild={setSelectedChild}
			/>
		</View>
	)
}
