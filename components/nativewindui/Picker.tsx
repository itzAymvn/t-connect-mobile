import { Picker as RNPicker } from "@react-native-picker/picker"
import { View } from "react-native"

export function Picker<T>({
	mode = "dropdown",
	...props
}: React.ComponentPropsWithoutRef<typeof RNPicker<T>>) {
	return (
		<View className="ios:shadow-sm ios:shadow-black/5 border-background bg-gray-100 rounded-md border">
			<RNPicker mode={mode} {...props} />
		</View>
	)
}

export const PickerItem = RNPicker.Item
