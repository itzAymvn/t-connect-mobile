export interface User {
	id: string
	login: string
	password: string
	nom: string
	prenom: string
	profil_id: string
	personnel_id: string | null
	famille_id: string | null
	eleve_id: string | null
	actif: boolean
	user_id: string
	acces_id: string
	ecole_id: string
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Famille {
	id: string
	nom: string
	observations: string
	tuteur_id: string
	conjoint_id: string
	pere_id: string
	mere_id: string
	situationFamiliale_id: string
	typeTuteur: string
	ecole_id: string
	user_id: string
	actif: boolean
	is_blacklisted: boolean
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Child
	extends Pick<
		Eleve,
		"id" | "prenom" | "nom" | "nomlng2" | "prenomlng2" | "datenaissance"
	> {
	inscriptions: Array<{
		id: string
		dateinscription: Date
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
	}>
}

export interface Eleve {
	id: string
	matricule: string
	prenom: string
	nom: string
	cessation: boolean
	datecessation: Date | null
	datenaissance: Date
	datepremiereentree: Date
	ecoleorigine: string
	appreciations: string
	email: string
	groupesangin: string
	handicape: boolean
	pediatre: string
	telpediatre: string
	allergies: string
	particularites: string
	traitement: string
	lieunaissanceOld: string
	lieunaissancelng2: string
	nationalite: string
	nbreanneedouble: number
	niveauscolaireaquis: string
	nomlng2: string
	numeroinscriptionecoleorigine: string
	idmassar: string
	numeronational: string
	observations: string
	prenomlng2: string
	scolarisation: string
	arriveDe_id: string | null
	tel: string
	vacccination: boolean
	cessationtype_id: string | null
	decisionconseil: string
	remarquecessation: string
	actif: boolean
	famille_id: string
	moisscolaire_id: string
	sexe_id: string
	quartier_id: string
	lieuNaissance_id: string
	typehandicape_id: string | null
	hasAllergieAlimentaire: boolean
	allergieAlimentaire: string
	hasIntoleranceAlimentaire: boolean
	intoleranceAlimentaire: string
	hasComportementAlimentaire: boolean
	comportementAlimentaire: string
	hasNeMangePas: boolean
	neMangePas: string
	hasSieste: boolean
	sieste: string
	nombreFreres: number
	nombreSoeurs: number
	rangFratrie: number
	prenomFreresSoeurs: string
	tel2: string
	telMaison: string
	parents: string
	telParents: string
	ecole_id: string
	responsableLegalTelephone: string
	user_id: string
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
	numeroDateAttestationRadiation: string
}

export interface Inscription {
	id: string
	dateinscription: Date
	inscriptionetat: string
	inscriptionresultat: string
	numeroinscription: string
	parrain: string
	classe_id: string
	eleve_id: string
	circuit_id: string | null
	moisscolaire_id: string
	affectationniveau_id: string
	preinscription_id: string | null
	dateentree: Date
	anneescolaire_id: string
	user_id: string
	ecole_id: string
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Classe {
	id: string
	code: string
	libelle: string
	libellelng2: string
	affectationniveau_id: string
	branche_id: string
	couleur: string
	idMassar: string
	massarId: string
	capacite: number
	anneescolaire_id: string
	ordre: number
	ecole_id: string
	user_id: string
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Niveau {
	id: string
	libelle: string
	libellelng2: string
	idMassar: string
	cycle_id: string
	actif: boolean
	ordre: number
	ecole_id: string
	user_id: string
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Cycle {
	id: string
	libelle: string
	libellelng2: string
	numeroautorisation: string
	dateautorisation: Date
	officiel: boolean
	cycleType: string
	seuilReussite: number
	actif: boolean
	ordre: number
	ecole_id: string
	user_id: string
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

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
