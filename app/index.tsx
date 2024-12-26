import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator"
import { Button } from "@/components/nativewindui/Button"
import { Text } from "@/components/nativewindui/Text"
import { ThemeToggle } from "@/components/nativewindui/ThemeToggle"
import { AuthContext } from "@/contexts/authContext"
import { useColorScheme } from "@/lib/useColorScheme"
import { login, loadUser } from "@/services/authService"
import { Icon } from "@roninoss/icons"
import { Redirect } from "expo-router"
import { useContext, useState } from "react"
import { TextInput, View, Image, ScrollView, Pressable } from "react-native"

export default function Login() {
	const { isDarkColorScheme } = useColorScheme()
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const { user, setUser } = useContext(AuthContext)

	if (user) {
		return <Redirect href="/(dashboard)/dashboard" />
	}

	const validateLogin = () => {
		if (!username || !password) {
			throw new Error("Veuillez remplir tous les champs")
		}
	}

	const handleLogin = async () => {
		try {
			setIsLoading(true)
			setError(null)
			validateLogin()
			await login(username, password)
			const userData = await loadUser()
			setUser(userData)
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Une erreur est survenue"
			setError(errorMessage)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View className="flex-1 justify-center items-center p-6 bg-background">
				<View className="absolute top-12 right-6">
					<ThemeToggle />
				</View>
				<View className="w-full max-w-sm gap-8">
					<View className="items-center gap-6">
						<Image
							source={{
								uri: `${process.env.EXPO_PUBLIC_BASE_URL}/assets/images/logo.png`,
							}}
							className="w-24 h-24"
							resizeMode="contain"
						/>
						<View className="gap-3">
							<Text
								variant="title1"
								className="text-center font-bold text-3xl"
							>
								T-CONNECT
							</Text>
							<Text
								variant="subhead"
								color="tertiary"
								className="text-center text-base"
							>
								Suivez la progression scolaire de vos enfants
							</Text>
						</View>
					</View>

					<View className="gap-6">
						<View className="gap-2">
							<Text
								variant="footnote"
								color="secondary"
								className="font-medium"
							>
								Nom d'utilisateur
							</Text>
							<TextInput
								className="w-full h-14 px-4 rounded-xl bg-secondary/5 text-foreground border border-secondary"
								placeholder="Entrez votre nom d'utilisateur"
								placeholderTextColor={
									isDarkColorScheme ? "#666" : "#999"
								}
								value={username}
								onChangeText={setUsername}
								autoCapitalize="none"
								autoComplete="username"
								autoCorrect={false}
							/>
						</View>

						<View className="gap-2">
							<Text
								variant="footnote"
								color="secondary"
								className="font-medium"
							>
								Mot de passe
							</Text>
							<TextInput
								className="w-full h-14 px-4 rounded-xl bg-secondary/5 text-foreground border border-secondary"
								placeholder="Entrez votre mot de passe"
								placeholderTextColor={
									isDarkColorScheme ? "#666" : "#999"
								}
								value={password}
								onChangeText={setPassword}
								secureTextEntry
								autoComplete="password"
							/>
						</View>
					</View>

					{error && (
						<View
							className={`w-full p-4 rounded-xl shadow-sm ${
								isDarkColorScheme
									? "bg-red-900/80 border border-red-700"
									: "bg-red-50 border border-red-200"
							}`}
						>
							<View className="flex-row justify-between items-start">
								<Text
									variant="footnote"
									className="text-red-500 flex-1 mr-2"
								>
									{error}
								</Text>
								<Pressable
									onPress={() => setError(null)}
									className="p-1"
									hitSlop={8}
								>
									<Icon
										namingScheme="sfSymbol"
										name="xmark"
										color={
											isDarkColorScheme
												? "#ef4444"
												: "#dc2626"
										}
										size={16}
									/>
								</Pressable>
							</View>
						</View>
					)}

					<View className="gap-4">
						<Button
							size="lg"
							className="w-full h-14 rounded-xl shadow-sm bg-primary hover:bg-primary/90"
							disabled={isLoading}
							onPress={handleLogin}
						>
							{isLoading ? (
								<ActivityIndicator size="small" color="white" />
							) : (
								<Text className="font-semibold text-white">
									Se connecter
								</Text>
							)}
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
