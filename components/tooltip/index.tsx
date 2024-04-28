import {
  Tooltip as ShadcnToolTip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type TooltipProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const Tooltip = ({ trigger, children, className }: TooltipProps) => {
  return (
    <TooltipProvider>
      <ShadcnToolTip>
        <TooltipTrigger asChild className={className}>
          <div>{trigger}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </ShadcnToolTip>
    </TooltipProvider>
  )
}
