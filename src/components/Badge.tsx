// components/ui/Badge.tsx
import React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
}

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  const badgeClasses = 
    variant === "primary"
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white"

  return (
    <span className={`${badgeClasses} px-2 py-0.5 rounded-full text-xs ${className}`}>
      {children}
    </span>
  )
}
