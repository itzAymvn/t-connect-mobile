import CourseCard from "@/components/emploi/CourseCard"
import DaySelector from "@/components/emploi/DaySelector"
import HolidayCard from "@/components/emploi/HolidayCard"
import { Picker, PickerItem } from "@/components/nativewindui/Picker"
import { Sheet, useSheetRef } from "@/components/nativewindui/Sheet"
import { useSelectedChild } from "@/contexts/childContext"
import { useColorScheme } from "@/lib/useColorScheme"
import { EmploiResponse, getEmploi } from "@/services/childService"
import { BottomSheetView } from "@gorhom/bottom-sheet"
import { useFocusEffect } from "@react-navigation/native"
import { Icon } from "@roninoss/icons"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useCallback, useState } from "react"
import {
    ActivityIndicator,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native"

// Main Component
export default function Emploi() {
	// State management
	const { selectedChild } = useSelectedChild()
	const { isDarkColorScheme } = useColorScheme()
	const [emploi, setEmploi] = useState<EmploiResponse | null>(null)
	const [selectedDay, setSelectedDay] = useState<string>("")
	const [selectedWeekId, setSelectedWeekId] = useState<string>("")

	// Loading states
	const [isLoading, setIsLoading] = useState(false)
	const [isWeekLoading, setIsWeekLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(false)

	// Error state
	const [error, setError] = useState<string | null>(null)

	// Refs
	const bottomSheetModalRef = useSheetRef()

	// Data fetching
	const findCurrentDay = useCallback((emploiDays: string[]) => {
		const today = format(new Date(), "EEEE", { locale: fr }).toLowerCase()
		return (
			emploiDays.find((day) => day.toLowerCase() === today) ||
			emploiDays[0]
		)
	}, [])

	const fetchEmploi = useCallback(
		async (weekId?: string) => {
			if (!selectedChild?.inscriptions[0]?.id) return
			setError(null)

			try {
				const data = await getEmploi(
					selectedChild.inscriptions[0].id,
					weekId
				)
				setEmploi(data)
				// Select current day if available, otherwise select first day
				if (data.emploi && Object.keys(data.emploi).length > 0) {
					const availableDays = Object.keys(data.emploi)
					const dayToSelect = findCurrentDay(availableDays)
					setSelectedDay(dayToSelect)
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Une erreur est survenue"
				)
			}
		},
		[selectedChild, findCurrentDay]
	)

	// Event handlers
	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		await fetchEmploi()
		setRefreshing(false)
	}, [fetchEmploi])

	const handleWeekChange = useCallback((weekId: string) => {
		setSelectedWeekId(weekId)
	}, [])

	const handleWeekSubmit = useCallback(async () => {
		setIsWeekLoading(true)
		try {
			await fetchEmploi(selectedWeekId)
			bottomSheetModalRef.current?.dismiss()
		} catch (error) {
			console.error(error)
		} finally {
			setIsWeekLoading(false)
		}
	}, [selectedWeekId, fetchEmploi, bottomSheetModalRef])

	// Initial data fetch
	useFocusEffect(
		useCallback(() => {
			setIsLoading(true)
			fetchEmploi().finally(() => setIsLoading(false))
		}, [fetchEmploi])
	)

	// Loading and error states
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

	// Helper function to render schedule content
	const renderScheduleContent = () => {
		if (!selectedDay) return null

		const isHoliday = emploi.emploi[selectedDay].some(
			(seance) => seance.jour_ferie_id
		)

		if (isHoliday) {
			return (
				<HolidayCard
					title={
						emploi.emploi[selectedDay][0].periode_ferie_libelle ||
						"Jour férié"
					}
				/>
			)
		}

		return emploi.emploi[selectedDay]
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
			))
	}

	return (
		<>
			<View className="flex-1 bg-gray-50 dark:bg-gray-900">
				{/* Header */}
				<View className="bg-white dark:bg-gray-800 p-4 mb-2 border-b border-gray-200 dark:border-gray-700">
					<View className="flex-row items-center justify-between">
						<View className="flex-1 mr-4">
							<Text className="text-2xl font-bold text-gray-900 dark:text-white">
								EMPLOI DU TEMPS
							</Text>
							{selectedSemaine && (
								<Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
									Du {selectedSemaine.datedebut} au{" "}
									{selectedSemaine.datefin}
								</Text>
							)}
						</View>
						<Pressable
							onPress={() =>
								bottomSheetModalRef.current?.present()
							}
							className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center"
						>
							<Icon
								namingScheme="sfSymbol"
								name="calendar"
								size={20}
								color={
									isDarkColorScheme
										? "rgb(255 255 255)"
										: "rgb(17 24 39)"
								}
							/>
						</Pressable>
					</View>
				</View>

				{/* Day selector */}
				<View className="px-4 pt-2">
					<DaySelector
						days={Object.keys(emploi.emploi)}
						selectedDay={selectedDay}
						onSelectDay={setSelectedDay}
					/>
				</View>

				{/* Schedule content */}
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
					{renderScheduleContent()}
				</ScrollView>
			</View>

			{/* Week selector sheet */}
			<Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
				<BottomSheetView className="flex-1 px-4 pb-8">
					<View className="w-full gap-y-4">
						<Text className="text-lg font-bold text-gray-900 dark:text-white">
							Sélectionner une semaine
						</Text>
						<Picker
							selectedValue={
								selectedWeekId || emploi.selected_semaine
							}
							onValueChange={handleWeekChange}
						>
							{emploi.semaines.map((semaine) => (
								<PickerItem
									key={semaine.id}
									label={`Du ${semaine.datedebut} au ${semaine.datefin}`}
									value={semaine.id}
								/>
							))}
						</Picker>

						<Pressable
							onPress={handleWeekSubmit}
							disabled={isWeekLoading}
							className={`${
								isWeekLoading ? "opacity-50" : ""
							} bg-gray-900 dark:bg-white border border-gray-900 dark:border-white rounded-lg px-6 py-3`}
						>
							{isWeekLoading ? (
								<ActivityIndicator
									color={
										isDarkColorScheme
											? "#111827"
											: "#ffffff"
									}
								/>
							) : (
								<Text className="text-white dark:text-gray-900 font-medium text-center">
									Valider
								</Text>
							)}
						</Pressable>
					</View>
				</BottomSheetView>
			</Sheet>
		</>
	)
}
