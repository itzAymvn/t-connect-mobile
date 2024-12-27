import "../global.css"

import { ThemeProvider as NavThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { LogBox } from "react-native"

import { AuthContext } from "@/contexts/authContext"
import { useColorScheme, useInitialAndroidBarSync } from "@/lib/useColorScheme"
import { loadUser } from "@/services/authService"
import { NAV_THEME } from "@/theme"
import * as SplashScreen from "expo-splash-screen"

export { ErrorBoundary } from "expo-router"

LogBox.ignoreAllLogs()
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	useInitialAndroidBarSync()
	const { colorScheme, isDarkColorScheme } = useColorScheme()
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		loadUser()
			.then(setUser)
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
					<Stack screenOptions={{ animation: "slide_from_right" }}>
						<Stack.Screen
							name="index"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(dashboard)"
							options={{
								headerShown: false,
							}}
						/>
					</Stack>
				</AuthContext.Provider>
			</NavThemeProvider>
		</>
	)
}
