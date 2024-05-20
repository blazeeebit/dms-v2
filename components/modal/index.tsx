import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'

type ModalProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  title: string
  description: string
  type?: 'Integration'
  logo?: string
  className?: string
}

export const Modal = ({
  trigger,
  children,
  title,
  description,
  type,
  logo,
  className,
}: ModalProps) => {
  switch (type) {
    case 'Integration':
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="max-w-lg">
            <div className="flex justify-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={`https://res.cloudinary.com/dthhovsye/image/upload/v1716055292/ucgpksedn8wvgmau1jt6.png`}
                  fill
                  alt="Corinna"
                />
              </div>
              <div className="text-gray-400">
                <ArrowLeft size={20} />
                <ArrowRight size={20} />
              </div>
              <div className="w-12 h-12 relative">
                <Image src={logo as string} fill alt="Corinna" />
              </div>
            </div>
            <DialogHeader className="flex items-center">
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className=" text-center">
                {description}
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      )
    default:
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className={className}>
            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      )
  }
}
