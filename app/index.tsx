import { AuthContext } from "@/contexts/authContext"
import { Redirect } from "expo-router"
import { useContext } from "react"

export default function Index() {
	const { user } = useContext(AuthContext)

	if (user) {
		return <Redirect href="/(dashboard)/dashboard" />
	}

	return <Redirect href="/login" />
}
