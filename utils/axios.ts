import { getToken } from "@/services/tokenService"
import axios from "axios"

/**
 * Custom axios instance with base configuration and auth token interceptor
 */
export const axiosInstance = axios.create({
	baseURL: "http://t-connect/api",
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
