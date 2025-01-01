import { Classe, Cycle, Eleve, Seance, Semaine } from "@/types"
import { axiosInstance } from "@/utils/axios"

export interface EmploiResponse {
	success: boolean
	selected_semaine: string
	semaines: Semaine[]
	emploi: {
		[key: string]: Seance[]
	}
}

interface ChildInscription {
	id: string
	dateinscription: string
	classe_id: string
	eleve_id: string
	affectationniveau_id: string
	classe: Pick<Classe, "id" | "libelle">
	affectationniveau: {
		id: string
		niveau_id: string
		niveau: {
			id: string
			libelle: string
			cycle_id: string
			cycle: Pick<Cycle, "id" | "libelle">
		}
	}
}

type GetChildrenResponse = Pick<
	Eleve,
	"id" | "prenom" | "nom" | "nomlng2" | "prenomlng2" | "datenaissance"
> & {
	inscriptions: ChildInscription[]
}

export const getChildren = async (): Promise<GetChildrenResponse | null> => {
	const { data } = await axiosInstance.get<GetChildrenResponse>("/children")
	return data || null
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
