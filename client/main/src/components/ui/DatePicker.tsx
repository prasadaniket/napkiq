import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="date"
          max={new Date().toISOString().split('T')[0]}
          className={cn(
            'w-full px-4 py-2.5 border border-neutral-light rounded-lg text-secondary bg-white',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'transition-colors duration-200',
            error && 'border-error focus:ring-error',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
export default DatePicker
