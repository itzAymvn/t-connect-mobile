import { axiosInstance } from "@/utils/axios"

export interface Seance {
	seance_semaine_id: string | null
	seance_id: string | null
	jour_id: string
	jour: string
	heuredebut: string
	heurefin: string
	affectation_unite_id: string | null
	unite_libelle: string | null
	personnel_nom: string | null
	personnel_prenom: string | null
	salle_libelle: string | null
	semaine_id: string
	datedebut: string
	datefin: string
	jour_ferie_id: string | null
	periode_ferie_libelle: string | null
	typetranchehoraire: "COURS" | "PAUSE" | "DEJEUNER"
	pause_heuredebut: string | null
}

export interface Semaine {
	id: string
	datedebut: string
	datefin: string
	libelle: string
	ordre: number
	anneescolaire_id: string
	ecole_id: string
	user_id: string
	flagInsert: number
	flagUpdate: number
	flagDelete: number
	lastUpdate: string
}

export interface EmploiResponse {
	success: boolean
	selected_semaine: string
	semaines: Semaine[]
	emploi: {
		[key: string]: Seance[]
	}
}

export const getChildren = async () => {
	const { data } = await axiosInstance.get("/children")
	return data
}

export const getEmploi = async (inscriptionId: string, semaineId?: string) => {
	try {
		if (!inscriptionId) {
			throw new Error("Veuillez sélectionner un enfant")
		}

		const params = new URLSearchParams()
		params.append("inscription_id", inscriptionId)
		if (semaineId) {
			params.append("semaine_id", semaineId)
		}

		const { data } = await axiosInstance.get<EmploiResponse>(`/emploi`, {
			params,
		})

		if (!data.success) {
			throw new Error("Quelque chose s'est mal passé")
		}

		return data
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				`Erreur lors de la récupération de l'emploi: ${error.message}`
			)
		}
		throw new Error(
			"Une erreur inattendue s'est produite lors de la récupération de l'emploi"
		)
	}
}
