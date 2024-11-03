// components/ui/Card.tsx
import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-white dark:bg-gray-900 ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
