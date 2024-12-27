import { useSelectedChild } from "@/contexts/childContext"
import { EmploiResponse, getEmploi, Seance } from "@/services/childService"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
	RefreshControl,
} from "react-native"

function CourseCard({ seance }: { seance: Seance }) {
	return (
		<View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 border border-gray-200 dark:border-gray-700">
			<View className="flex-row justify-between items-start mb-2">
				<Text className="font-bold text-lg text-gray-900 dark:text-white flex-1 mr-3">
					{seance.typetranchehoraire === "COURS"
						? seance.unite_libelle
						: seance.typetranchehoraire}
				</Text>
				<View className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full shrink-0">
					<Text className="text-sm text-gray-600 dark:text-gray-300">
						{seance.heuredebut} - {seance.heurefin}
					</Text>
				</View>
			</View>

			{seance.typetranchehoraire === "COURS" && (
				<View className="mt-2 space-y-1">
					{seance.personnel_prenom && seance.personnel_nom && (
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							{seance.personnel_prenom} {seance.personnel_nom}
						</Text>
					)}
					{seance.salle_libelle && (
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							{seance.salle_libelle}
						</Text>
					)}
				</View>
			)}
		</View>
	)
}

function DaySelector({
	days,
	selectedDay,
	onSelectDay,
}: {
	days: string[]
	selectedDay: string
	onSelectDay: (day: string) => void
}) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="mb-4"
		>
			{days.map((day) => (
				<Pressable
					key={day}
					onPress={() => onSelectDay(day)}
					className={`mr-2 px-6 py-3 rounded-lg border ${
						selectedDay === day
							? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
							: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
					}`}
				>
					<Text
						className={`font-medium ${
							selectedDay === day
								? "text-white dark:text-gray-900"
								: "text-gray-900 dark:text-white"
						}`}
					>
						{day}
					</Text>
				</Pressable>
			))}
		</ScrollView>
	)
}

export default function Emploi() {
	const { selectedChild } = useSelectedChild()
	const [emploi, setEmploi] = useState<EmploiResponse | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [selectedDay, setSelectedDay] = useState<string>("")
	const [refreshing, setRefreshing] = useState(false)

	const fetchEmploi = useCallback(async () => {
		if (!selectedChild?.inscriptions[0]?.id) return

		setError(null)

		try {
			const data = await getEmploi(selectedChild.inscriptions[0].id)
			setEmploi(data)
			if (data.emploi && Object.keys(data.emploi).length > 0) {
				setSelectedDay(Object.keys(data.emploi)[0])
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Une erreur est survenue"
			)
		}
	}, [selectedChild])

	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		await fetchEmploi()
		setRefreshing(false)
	}, [fetchEmploi])

	useFocusEffect(
		useCallback(() => {
			setIsLoading(true)
			fetchEmploi().finally(() => setIsLoading(false))
		}, [fetchEmploi])
	)

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#111827" />
			</View>
		)
	}

	if (error) {
		return (
			<View className="flex-1 items-center justify-center p-4">
				<Text className="text-red-500 text-center">{error}</Text>
			</View>
		)
	}

	if (!emploi) {
		return (
			<View className="flex-1 items-center justify-center p-4">
				<Text className="text-center text-gray-600 dark:text-gray-400">
					Aucun emploi du temps disponible
				</Text>
			</View>
		)
	}

	const selectedSemaine = emploi.semaines.find(
		(s) => s.id === emploi.selected_semaine
	)

	return (
		<View className="flex-1 bg-gray-50 dark:bg-gray-900">
			<View className="bg-white dark:bg-gray-800 p-4 mb-2 border-b border-gray-200 dark:border-gray-700">
				<Text className="text-2xl font-bold text-gray-900 dark:text-white">
					{selectedChild?.prenom}
				</Text>
				{selectedSemaine && (
					<Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
						Du {selectedSemaine.datedebut} au{" "}
						{selectedSemaine.datefin}
					</Text>
				)}
			</View>

			<View className="px-4 pt-2">
				<DaySelector
					days={Object.keys(emploi.emploi)}
					selectedDay={selectedDay}
					onSelectDay={setSelectedDay}
				/>
			</View>

			<ScrollView
				className="flex-1 px-4"
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#111827"
						colors={["#111827"]}
					/>
				}
			>
				{selectedDay &&
					emploi.emploi[selectedDay]
						.filter((seance, index, array) => {
							if (index === array.length - 1) {
								return !["pause", "dejeuner"].includes(
									seance.typetranchehoraire.toLowerCase()
								)
							}
							return true
						})
						.map((seance) => (
							<CourseCard
								key={`${seance.heuredebut}-${seance.heurefin}`}
								seance={seance}
							/>
						))}
			</ScrollView>
		</View>
	)
}
