import { Child } from "@/types"
import { createContext, useContext } from "react"

interface ChildContextType {
	selectedChild: Child | null
	setSelectedChild: (child: Child | null) => void
}

export const ChildContext = createContext<ChildContextType>({
	selectedChild: null,
	setSelectedChild: () => {},
})

export const useSelectedChild = () => {
	return useContext(ChildContext)
}
