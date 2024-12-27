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
			</View>
		</ScrollView>
	)
}
