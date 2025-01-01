import "../global.css"

import { ThemeProvider as NavThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState, Suspense } from "react"
import { LogBox, ActivityIndicator, View } from "react-native"

import { AuthContext } from "@/contexts/authContext"
import { ChildContext } from "@/contexts/childContext"
import { useColorScheme, useInitialAndroidBarSync } from "@/lib/useColorScheme"
import { loadUser, LoadUserResponse } from "@/services/authService"
import { NAV_THEME } from "@/theme"
import { Child } from "@/types"
import * as SplashScreen from "expo-splash-screen"

export { ErrorBoundary } from "expo-router"

LogBox.ignoreAllLogs()
SplashScreen.preventAutoHideAsync()

const LoadingScreen = () => (
	<View className="flex-1 items-center justify-center bg-background">
		<ActivityIndicator size="large" color="#111827" />
	</View>
)

export default function RootLayout() {
	useInitialAndroidBarSync()
	const { colorScheme, isDarkColorScheme } = useColorScheme()
	const [user, setUser] = useState<LoadUserResponse | null>(null)
	const [selectedChild, setSelectedChild] = useState<Child | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		loadUser()
			.then((userData) => {
				if (userData) {
					setUser(userData)
					if (userData.children?.length > 0) {
						setSelectedChild(userData.children[0])
					}
				}
			})
			.catch(() => {})
			.finally(() => {
				setIsLoading(false)
				SplashScreen.hideAsync()
			})
	}, [])

	if (isLoading) {
		return <LoadingScreen />
	}

	return (
		<>
			<StatusBar
				key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
				style={isDarkColorScheme ? "light" : "dark"}
			/>

			<NavThemeProvider value={NAV_THEME[colorScheme]}>
				<AuthContext.Provider value={{ user, setUser }}>
					<ChildContext.Provider
						value={{ selectedChild, setSelectedChild }}
					>
						<Suspense fallback={<LoadingScreen />}>
							{user ? (
								<Stack
									screenOptions={{
										headerShown: false,
										animation: "fade",
										animationDuration: 200,
									}}
								>
									<Stack.Screen
										name="(dashboard)"
										options={{
											animation: "slide_from_right",
											animationDuration: 200,
										}}
									/>
								</Stack>
							) : (
								<Stack
									screenOptions={{
										headerShown: false,
										animation: "fade",
										animationDuration: 200,
									}}
								>
									<Stack.Screen
										name="login"
										options={{
											animation: "slide_from_right",
											animationDuration: 200,
										}}
									/>
									<Stack.Screen
										name="index"
										options={{
											animation: "slide_from_right",
											animationDuration: 200,
										}}
									/>
								</Stack>
							)}
						</Suspense>
					</ChildContext.Provider>
				</AuthContext.Provider>
			</NavThemeProvider>
		</>
	)
}
