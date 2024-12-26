import { createContext } from "react"

interface Inscription {
	id: string
	dateinscription: string
	classe_id: string
	eleve_id: string
}

interface Child {
	id: string
	prenom: string
	nom: string
	inscriptions: Inscription[]
}

interface Famille {
	id: string
	nom: string
	observations: string
	tuteur_id: string | null
	conjoint_id: string | null
	pere_id: string
	mere_id: string
	situationFamiliale_id: string | null
	typeTuteur: string
	ecole_id: string
	user_id: string
	actif: number
	is_blacklisted: number
	flagInsert: number
	flagUpdate: number
	flagDelete: number
	lastUpdate: string
}

interface User {
	id: string
	login: string
	nom: string
	prenom: string
	profil_id: string
	personnel_id: string | null
	famille_id: string
	eleve_id: string | null
	actif: number
	user_id: string
	acces_id: string
	ecole_id: string
	flagInsert: number
	flagUpdate: number
	flagDelete: number
	lastUpdate: string
	famille: Famille
}

interface AuthUser {
	user: User
	children: Child[]
}

interface AuthContextType {
	user: AuthUser | null
	setUser: any
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
})
