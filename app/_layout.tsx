import "../global.css"

import { ThemeProvider as NavThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { LogBox } from "react-native"

import { AuthContext } from "@/contexts/authContext"
import { ChildContext } from "@/contexts/childContext"
import { useColorScheme, useInitialAndroidBarSync } from "@/lib/useColorScheme"
import { loadUser } from "@/services/authService"
import { NAV_THEME } from "@/theme"
import { Child } from "@/types"
import * as SplashScreen from "expo-splash-screen"

export { ErrorBoundary } from "expo-router"

LogBox.ignoreAllLogs()
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	useInitialAndroidBarSync()
	const { colorScheme, isDarkColorScheme } = useColorScheme()
	const [user, setUser] = useState(null)
	const [selectedChild, setSelectedChild] = useState<Child | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		loadUser()
			.then((userData) => {
				setUser(userData)
				// Set the first child as default selected child
				if (userData?.children?.length > 0) {
					setSelectedChild(userData.children[0])
				}
			})
			.catch(() => {})
			.finally(() => setIsLoading(false))

		SplashScreen.hideAsync()
	}, [])

	if (isLoading) {
		return null
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
						{user ? (
							<Stack screenOptions={{ headerShown: false }}>
								<Stack.Screen
									name="(dashboard)"
									options={{ animation: "simple_push" }}
								/>
							</Stack>
						) : (
							<Stack screenOptions={{ headerShown: false }}>
								<Stack.Screen
									name="login"
									options={{ animation: "simple_push" }}
								/>
								<Stack.Screen
									name="index"
									options={{ animation: "simple_push" }}
								/>
							</Stack>
						)}
					</ChildContext.Provider>
				</AuthContext.Provider>
			</NavThemeProvider>
		</>
	)
}
