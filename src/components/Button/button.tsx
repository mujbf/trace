import React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

interface SecondaryButtonProps extends ButtonProps {
  showArrow?: boolean
}

// Primary Button Component
export function PrimaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'group relative w-fit px-5 py-4 rounded-full manrope-medium text-base text-dark-100 bg-white border border-dark-20 overflow-hidden transition-all duration-300 ease-out hover:text-light-100 hover:bg-primary-700 hover:border-primary-800 hover:scale-105 hover:shadow-lg hover:shadow-primary-700/25',
        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
        {children}
      </span>

      {/* Fluid background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-primary-700 opacity-0 group-hover:opacity-20 transform scale-75 group-hover:scale-100 transition-all duration-700 ease-out"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
    </button>
  )
}

// Secondary Button Component
export function SecondaryButton({
  children,
  className,
  showArrow = true,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={cn(
        'group relative w-fit flex items-center gap-2 manrope-medium text-base md:text-lg text-dark-80 transition-all duration-300 ease-out hover:text-primary-800 hover:gap-3',
        className,
      )}
      {...props}
    >
      <span className="relative overflow-hidden">
        {children}
        {/* Animated underline */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
      </span>

      {/* Arrow with smooth movement */}
      {showArrow && (
        <div className="relative overflow-hidden">
          <ChevronRight className="w-4 h-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />

          {/* Arrow trail effect */}
          <ChevronRight
            className="w-4 h-4 absolute top-0 left-0 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60 transition-all duration-300 ease-out delay-75"
            strokeWidth={1}
          />
        </div>
      )}
    </button>
  )
}
