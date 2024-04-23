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
}

export const SideDrawer = ({
  trigger,
  children,
  title,
  description,
  side,
}: SideDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
