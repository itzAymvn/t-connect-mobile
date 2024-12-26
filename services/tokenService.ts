import * as SecureStore from "expo-secure-store"

/**
 * Service for managing authentication tokens securely using expo-secure-store
 */

/**
 * Retrieves the stored authentication token
 * @returns Promise<string | null> The stored token or null if not found
 */
export const getToken = async () => {
	const token = await SecureStore.getItemAsync("token")
	return token
}

/**
 * Stores an authentication token securely
 * @param token - The token string to store
 * @returns Promise<void>
 */
export const setToken = async (token: string) => {
	await SecureStore.setItemAsync("token", token)
}

/**
 * Removes the stored authentication token
 * @returns Promise<void>
 */
export const removeToken = async () => {
	await SecureStore.deleteItemAsync("token")
}
