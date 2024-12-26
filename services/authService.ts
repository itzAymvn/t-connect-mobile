import { axiosInstance } from "@/utils/axios"
import { getToken, removeToken, setToken } from "./tokenService"
import { Platform } from "react-native"

export const login = async (username: string, password: string) => {
	const { data } = await axiosInstance.post("/login", {
		login: username,
		password: password,
		device_name: `${Platform.OS} ${Platform.Version}`,
	})

	await setToken(data.token)
}

export const loadUser = async () => {
	const { data } = await axiosInstance.get("/user")
	return data
}

export const logout = async () => {
	if (await getToken()) {
		await axiosInstance.post("/logout")
	}

	await removeToken()
}
