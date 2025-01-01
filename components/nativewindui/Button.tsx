import * as Slot from "@rn-primitives/slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import {
	Platform,
	Pressable,
	PressableProps,
	View,
	ViewStyle,
} from "react-native"

import { TextClassContext } from "@/components/nativewindui/Text"
import { cn } from "@/lib/cn"
import { useColorScheme } from "@/lib/useColorScheme"
import { COLORS } from "@/theme/colors"

const buttonVariants = cva("flex-row items-center justify-center gap-2", {
	variants: {
		variant: {
			primary: "ios:active:opacity-80 bg-primary",
			secondary:
				"ios:border-primary ios:active:bg-primary/5 border border-foreground/40",
			tonal: "ios:bg-primary/10 dark:ios:bg-primary/10 ios:active:bg-primary/15 bg-primary/15 dark:bg-primary/30",
			plain: "ios:active:opacity-70",
		},
		size: {
			none: "",
			sm: "py-1 px-2.5 rounded-full",
			md: "ios:rounded-lg py-2 ios:py-1.5 ios:px-3.5 px-5 rounded-full",
			lg: "py-2.5 px-5 ios:py-2 rounded-xl gap-2",
			icon: "ios:rounded-lg h-10 w-10 rounded-full",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
})

const androidRootVariants = cva("overflow-hidden", {
	variants: {
		size: {
			none: "",
			icon: "rounded-full",
			sm: "rounded-full",
			md: "rounded-full",
			lg: "rounded-xl",
		},
	},
	defaultVariants: {
		size: "md",
	},
})

interface ButtonProps
	extends Omit<PressableProps, "disabled">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	disabled?: boolean
	textClass?: string
	className?: string
	style?: ViewStyle
}

const Button = React.memo(
	React.forwardRef<View, ButtonProps>(
		(
			{
				children,
				asChild,
				variant,
				size,
				className,
				textClass,
				disabled,
				style,
				...props
			},
			ref
		) => {
			const { colors } = useColorScheme()
			const Component = asChild ? Slot.Pressable : Pressable
			const isAndroid = Platform.OS === "android"

			const buttonClass = React.useMemo(
				() => buttonVariants({ variant, size, className }),
				[variant, size, className]
			)

			const androidRootClass = React.useMemo(
				() => (isAndroid ? androidRootVariants({ size }) : ""),
				[isAndroid, size]
			)

			return (
				<View
					ref={ref}
					className={cn(androidRootClass, disabled && "opacity-40")}
					style={style}
				>
					<Component
						className={buttonClass}
						disabled={disabled}
						{...props}
					>
						<TextClassContext.Provider
							value={{ className: textClass }}
						>
							{children}
						</TextClassContext.Provider>
					</Component>
				</View>
			)
		}
	)
)

Button.displayName = "Button"

export { Button, type ButtonProps }
