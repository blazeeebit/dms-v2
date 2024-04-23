import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type SideDrawerProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  title?: string
  description?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export const SideDrawer = ({
  trigger,
  children,
  title,
  description,
  side,
  className,
}: SideDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
