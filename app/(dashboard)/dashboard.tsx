import { Button } from "@/components/nativewindui/Button"
import { Text } from "@/components/nativewindui/Text"
import { AuthContext } from "@/contexts/authContext"
import { Redirect } from "expo-router"
import React, { useContext, useState } from "react"
import { ScrollView, View } from "react-native"

export default function Dashboard() {
	const { user } = useContext(AuthContext)
	const [, setIsRefreshing] = useState(false)

	if (!user) {
		return <Redirect href="/" />
	}

	const onRefresh = async () => {
		setIsRefreshing(true)
		// Add your refresh logic here
		setTimeout(() => setIsRefreshing(false), 1000)
	}

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View className="flex-1 bg-gray-50 dark:bg-gray-900">
				{/* Header */}
				<View className="bg-white dark:bg-gray-800 p-4 mb-2 border-b border-gray-200 dark:border-gray-700">
					<View className="flex-row items-center gap-4">
						<View className="bg-gray-100 dark:bg-gray-700 h-16 w-16 rounded-full items-center justify-center">
							<Text className="text-gray-900 dark:text-white text-xl font-medium">
								{user.user.prenom[0]}
								{user.user.nom[0]}
							</Text>
						</View>
						<View>
							<Text className="text-2xl font-bold text-gray-900 dark:text-white">
								{user.user.prenom} {user.user.nom}
							</Text>
							<Text className="text-sm text-gray-500 dark:text-gray-400">
								Tableau de bord parent
							</Text>
						</View>
					</View>
				</View>

				{/* Content */}
				<View className="flex-1 p-4">
					{user?.children && user.children.length > 0 ? (
						<View className="gap-6">
							<Text className="text-xl font-semibold text-gray-900 dark:text-white">
								Enfants inscrits ({user.children.length})
							</Text>

							<View className="gap-4">
								{user.children.map((child) => (
									<View
										key={child.id}
										className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex-row items-center gap-4"
									>
										<View className="bg-gray-100 dark:bg-gray-700 h-14 w-14 rounded-full items-center justify-center">
											<Text className="text-gray-900 dark:text-white font-semibold text-lg">
												{child.prenom[0]}
												{child.nom[0]}
											</Text>
										</View>
										<View>
											<Text className="font-bold text-gray-900 dark:text-white">
												{child.prenom} {child.nom}
											</Text>
											<Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
												Élève
											</Text>
										</View>
									</View>
								))}
							</View>
						</View>
					) : (
						<View className="flex-1 justify-center items-center">
							<Text className="text-gray-600 dark:text-gray-400 text-center">
								Aucun enfant n'est actuellement enregistré dans
								votre compte
							</Text>
							<Button
								onPress={onRefresh}
								variant="secondary"
								className="mt-4"
							>
								<Text className="text-gray-900 dark:text-white">
									Actualiser
								</Text>
							</Button>
						</View>
					)}
				</View>
			</View>
		</ScrollView>
	)
}
