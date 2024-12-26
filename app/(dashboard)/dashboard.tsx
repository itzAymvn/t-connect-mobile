import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator"
import { Button } from "@/components/nativewindui/Button"
import { Text } from "@/components/nativewindui/Text"
import { ThemeToggle } from "@/components/nativewindui/ThemeToggle"
import { AuthContext } from "@/contexts/authContext"
import { logout as logoutService } from "@/services/authService"
import { Redirect, router } from "expo-router"
import React, { useContext, useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import { Icon } from "@roninoss/icons"

export default function Dashboard() {
	const { user, setUser } = useContext(AuthContext)
	const [isRefreshing, setIsRefreshing] = useState(false)

	if (!user) {
		return <Redirect href="/" />
	}

	const logout = async () => {
		await logoutService()
		setUser(null)
		router.replace("/")
	}

	const onRefresh = async () => {
		setIsRefreshing(true)
		// Add your refresh logic here
		setTimeout(() => setIsRefreshing(false), 1000)
	}

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View className="flex-1 bg-background">
				{/* Header */}
				<View className="p-6 border-b border-border">
					<View className="flex-row items-center gap-4">
						<View className="bg-primary/10 h-16 w-16 rounded-full items-center justify-center">
							<Text className="text-primary text-xl font-medium">
								{user.user.prenom[0]}
								{user.user.nom[0]}
							</Text>
						</View>
						<View>
							<Text
								variant="title2"
								className="font-bold text-foreground"
							>
								{user.user.prenom} {user.user.nom}
							</Text>
							<Text variant="subhead" color="tertiary">
								Tableau de bord parent
							</Text>
						</View>
					</View>
				</View>

				{/* Content */}
				<View className="flex-1 p-6">
					{user?.children && user.children.length > 0 ? (
						<View className="gap-6">
							<Text
								variant="title3"
								className="text-foreground font-semibold"
							>
								Enfants inscrits ({user.children.length})
							</Text>

							<View className="gap-4">
								{user.children.map((child) => (
									<View
										key={child.id}
										className="bg-card/50 rounded-2xl p-6 shadow-lg border border-border/50 flex-row items-center gap-4"
									>
										<View className="bg-primary/10 h-14 w-14 rounded-full items-center justify-center">
											<Text className="text-primary font-semibold text-lg">
												{child.prenom[0]}
												{child.nom[0]}
											</Text>
										</View>
										<View>
											<Text
												variant="heading"
												className="font-bold text-foreground"
											>
												{child.prenom} {child.nom}
											</Text>
											<Text
												variant="subhead"
												color="tertiary"
												className="mt-1"
											>
												Élève
											</Text>
										</View>
									</View>
								))}
							</View>
						</View>
					) : (
						<View className="flex-1 justify-center items-center">
							<Text
								variant="subhead"
								className="text-foreground/60 text-center"
							>
								Aucun enfant n'est actuellement enregistré dans
								votre compte
							</Text>
							<Button
								onPress={onRefresh}
								variant="secondary"
								className="mt-4"
							>
								<Text className="text-primary">Actualiser</Text>
							</Button>
						</View>
					)}
				</View>

				{/* Footer */}
				<View className="p-6 border-t border-border">
					<View className="gap-4">
						<Button
							size="lg"
							className="w-full h-14 rounded-xl shadow-sm bg-red-500"
							onPress={logout}
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
		</ScrollView>
	)
}
