import { axiosInstance } from "@/utils/axios"
import { getToken, removeToken, setToken } from "./tokenService"
import { Platform } from "react-native"
import { Classe, Cycle, Eleve, Inscription, Niveau } from "@/types"
import { Famille } from "@/types"
import { User } from "@/types"

export const login = async (username: string, password: string) => {
	const { data } = await axiosInstance.post("/login", {
		login: username,
		password: password,
		device_name: `${Platform.OS} ${Platform.Version}`,
	})

	await setToken(data.token)
}

export interface LoadUserResponse {
	user: User & {
		famille: Famille
	}
	children: (Pick<
		Eleve,
		"id" | "prenom" | "nom" | "nomlng2" | "prenomlng2" | "datenaissance"
	> & {
		inscriptions: (Pick<
			Inscription,
			| "id"
			| "dateinscription"
			| "classe_id"
			| "eleve_id"
			| "affectationniveau_id"
		> & {
			classe: Pick<Classe, "id" | "libelle">
			affectationniveau: {
				id: string
				niveau_id: string
				niveau: Pick<Niveau, "id" | "libelle" | "cycle_id"> & {
					cycle: Pick<Cycle, "id" | "libelle">
				}
			}
		})[]
	})[]
}

export const loadUser = async (): Promise<LoadUserResponse | null> => {
	const { data } = await axiosInstance.get("/user")
	return data || null
}

export const logout = async () => {
	if (await getToken()) {
		await axiosInstance.post("/logout")
	}

	await removeToken()
}
