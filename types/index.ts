export interface Inscription {
	id: string
	dateinscription: string
	classe_id: string
	eleve_id: string
}

export interface Child {
	id: string
	prenom: string
	nom: string
	inscriptions: Inscription[]
}

export interface User {
	id: string
	nom: string
	observations: string
	children: Child[]
}
