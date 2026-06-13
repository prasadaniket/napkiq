import { cn } from '@/lib/utils'

interface LoaderProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

const sizeMap = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' }

export default function Loader({ className, size = 'md', fullScreen = false }: LoaderProps) {
  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-white/30 border-t-[#00021D]',
        sizeMap[size],
        className
      )}
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {spinner}
      </div>
    )
  }

  return <div className="flex justify-center py-8">{spinner}</div>
}
