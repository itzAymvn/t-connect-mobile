import { LoadUserResponse } from "@/services/authService"
import { createContext } from "react"

interface AuthContextType {
	user: LoadUserResponse | null
	setUser: (user: LoadUserResponse | null) => void
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
})
