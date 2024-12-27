import * as SecureStore from "expo-secure-store"

let token: string | null = null

/**
 * Service for managing authentication tokens securely using expo-secure-store
 */

/**
 * Retrieves the stored authentication token
 * @returns Promise<string | null> The stored token or null if not found
 */
export const getToken = async () => {
	if (token !== null) {
		return token
	}

	token = await SecureStore.getItemAsync("token")
	return token
}

/**
 * Stores an authentication token securely
 * @param token - The token string to store
 * @returns Promise<void>
 */
export const setToken = async (newToken: string) => {
	token = newToken

	if (token !== null) {
		await SecureStore.setItemAsync("token", token)
	} else {
		await SecureStore.deleteItemAsync("token")
	}
}

/**
 * Removes the stored authentication token
 * @returns Promise<void>
 */
export const removeToken = async () => {
	if (token !== null) {
		await SecureStore.deleteItemAsync("token")
	}

	token = null
}
