import { AuthContext } from "@/contexts/authContext"
import { ChildContext } from "@/contexts/childContext"
import { logout } from "@/services/authService"
import { Child } from "@/types"
import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { useRouter } from "expo-router"
import { useContext } from "react"
import { Image, Pressable, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Picker, PickerItem } from "./nativewindui/Picker"
import { Text } from "./nativewindui/Text"

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
							className="font-bold text-gray-900 dark:text-white"
						>
							T-CONNECT
						</Text>
						<Text
							variant="subhead"
							className="text-gray-500 dark:text-gray-400"
						>
							Portail parent
						</Text>
					</View>
				</View>
				<Pressable
					onPress={handleLogout}
					className="w-10 h-10 rounded-full bg-red-500/10 dark:bg-red-500/20 items-center justify-center"
				>
					<Text className="text-red-500 dark:text-red-400">×</Text>
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
			className="p-6 border-t border-gray-200 dark:border-gray-700"
			style={{ paddingBottom: Math.max(bottom, 16) }}
		>
			{/* Child Selection */}
			{user?.children && user.children.length > 0 && (
				<View className="mb-6">
					<Text
						variant="subhead"
						className="mb-2 text-gray-500 dark:text-gray-400"
					>
						Sélectionner un enfant
					</Text>
					<Picker
						selectedValue={selectedChild?.id}
						onValueChange={(value) => {
							const child = user.children.find(
								(c) => c.id === value
							)
							setSelectedChild(child || null)
						}}
					>
						{user.children.map((child) => (
							<PickerItem
								key={child.id}
								label={`${child.prenom} (${child.inscriptions[0].classe.libelle})`}
								value={child.id}
							/>
						))}
					</Picker>
				</View>
			)}

			<Text
				variant="footnote"
				color="tertiary"
				className="text-center text-gray-500 dark:text-gray-400"
			>
				© 2024{" "}
				<Text
					variant="footnote"
					className="underline text-gray-500 dark:text-gray-400"
				>
					MJTech
				</Text>
				. Tous droits réservés.
			</Text>
		</View>
	)
}

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	const { setUser } = useContext(AuthContext)
	const { selectedChild, setSelectedChild } = useContext(ChildContext)
	const router = useRouter()

	const handleLogout = async () => {
		try {
			await logout()
			setUser(null)
			router.navigate("/login")
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<View className="flex-1 bg-gray-50 dark:bg-gray-900">
			<View className="flex-1">
				<DrawerHeader handleLogout={handleLogout} />

				{selectedChild && (
					<View className="px-4 py-2 mb-4 bg-white dark:bg-gray-800 mx-2 rounded-lg">
						<View className="mb-2">
							<Text className="text-sm text-gray-500 dark:text-gray-400">
								Nom complet
							</Text>
							<Text className="font-medium text-gray-900 dark:text-white">
								{selectedChild.prenom} {selectedChild.nom}
							</Text>
							<Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
								{selectedChild.prenomlng2}{" "}
								{selectedChild.nomlng2}
							</Text>
						</View>

						<View className="mb-2">
							<Text className="text-sm text-gray-500 dark:text-gray-400">
								Date de naissance
							</Text>
							<Text className="font-medium text-gray-900 dark:text-white">
								{new Date(
									selectedChild.datenaissance
								).toLocaleDateString()}
							</Text>
						</View>

						{selectedChild.inscriptions[0] && (
							<View>
								<Text className="text-sm text-gray-500 dark:text-gray-400">
									Classe
								</Text>
								<Text className="font-medium text-gray-900 dark:text-white">
									{
										selectedChild.inscriptions[0].classe
											.libelle
									}
								</Text>
								<Text className="text-sm text-gray-500 dark:text-gray-400">
									{
										selectedChild.inscriptions[0]
											.affectationniveau.niveau.cycle
											.libelle
									}
								</Text>
							</View>
						)}
					</View>
				)}
			</View>

			<DrawerFooter
				selectedChild={selectedChild}
				setSelectedChild={setSelectedChild}
			/>
		</View>
	)
}
