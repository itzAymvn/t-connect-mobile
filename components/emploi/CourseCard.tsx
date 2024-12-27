import { Seance } from "@/services/childService"
import { View } from "react-native"
import { Text } from "../nativewindui/Text"

export default function CourseCard({ seance }: { seance: Seance }) {
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