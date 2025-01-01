export interface User {
	id: number
	login: string
	password: string
	nom: string
	prenom: string
	profil_id: number
	personnel_id: number | null
	famille_id: number | null
	eleve_id: number | null
	actif: boolean
	user_id: number
	acces_id: number
	ecole_id: number
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Famille {
	id: number
	nom: string
	observations: string
	tuteur_id: number
	conjoint_id: number
	pere_id: number
	mere_id: number
	situationFamiliale_id: number
	typeTuteur: string
	ecole_id: number
	user_id: number
	actif: boolean
	is_blacklisted: boolean
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Eleve {
	id: number
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
	arriveDe_id: number | null
	tel: string
	vacccination: boolean
	cessationtype_id: number | null
	decisionconseil: string
	remarquecessation: string
	actif: boolean
	famille_id: number
	moisscolaire_id: number
	sexe_id: number
	quartier_id: number
	lieuNaissance_id: number
	typehandicape_id: number | null
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
	ecole_id: number
	responsableLegalTelephone: string
	user_id: number
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
	numeroDateAttestationRadiation: string
}

export interface Inscription {
	id: number
	dateinscription: Date
	inscriptionetat: string
	inscriptionresultat: string
	numeroinscription: string
	parrain: string
	classe_id: number
	eleve_id: number
	circuit_id: number | null
	moisscolaire_id: number
	affectationniveau_id: number
	preinscription_id: number | null
	dateentree: Date
	anneescolaire_id: number
	user_id: number
	ecole_id: number
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Classe {
	id: number
	code: string
	libelle: string
	libellelng2: string
	affectationniveau_id: number
	branche_id: number
	couleur: string
	idMassar: string
	massarId: string
	capacite: number
	anneescolaire_id: number
	ordre: number
	ecole_id: number
	user_id: number
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Niveau {
	id: number
	libelle: string
	libellelng2: string
	idMassar: string
	cycle_id: number
	actif: boolean
	ordre: number
	ecole_id: number
	user_id: number
	flagInsert: boolean
	flagUpdate: boolean
	flagDelete: boolean
	lastUpdate: Date
}

export interface Cycle {
	id: number
	libelle: string
	libellelng2: string
	numeroautorisation: string
	dateautorisation: Date
	officiel: boolean
	cycleType: string
	seuilReussite: number
	actif: boolean
	ordre: number
	ecole_id: number
	user_id: number
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

