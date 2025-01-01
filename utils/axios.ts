import { getToken } from "@/services/tokenService"
import axios from "axios"

/**
 * Custom axios instance with base configuration and auth token interceptor
 */
export const axiosInstance = axios.create({
	baseURL: `${process.env.EXPO_PUBLIC_BASE_URL}/api/parent`,
	headers: {
		"Content-Type": "application/json",
	},
})

/**
 * Request interceptor that adds the auth token to requests if available
 *
 * @param request - The axios request config
 * @returns The modified request config with auth header if token exists
 */
axiosInstance.interceptors.request.use(async (request) => {
	const token = await getToken()

	if (token) {
		request.headers.Authorization = `Bearer ${token}`
	}

	return request
})

/**
 * Response interceptor that preserves original error messages
 */
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.data?.message) {
			error.message = error.response.data.message
		}
		return Promise.reject(error)
	}
)
