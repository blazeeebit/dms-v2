import React from 'react'
import {
  WashingMachine,
  Dumbbell,
  Coffee,
  ClipboardList,
  Headphones,
  Scissors,
  CookingPot,
  Tv2,
  Hotel,
  GraduationCap,
  User,
  Shield,
  Trash,
  Eye,
  EyeOff,
  FolderPen,
  Mail,
  NotebookTabs,
  ContactIcon,
  Building,
  CircleDollarSign,
  Bath,
  Store,
  BookOpenText,
  ChefHat,
} from 'lucide-react'

type IconRendererProp = {
  icon?: string
}

export const IconRenderer = ({ icon }: IconRendererProp) => {
  switch (icon) {
    case 'laundry':
      return <WashingMachine />
    case 'gym':
      return <Dumbbell />
    case 'cafe':
      return <Coffee />
    case 'barber':
      return <Scissors />
    case 'copy':
      return <ClipboardList />
    case 'headset':
      return <Headphones />
    case 'kitchen':
      return <CookingPot />
    case 'cinema':
      return <Tv2 />
    case 'dorm':
      return <Hotel />
    case 'student':
      return <GraduationCap />
    case 'owner':
      return <User />
    case 'admin':
      return <Shield />
    case 'delete':
      return <Trash />
    case 'visible':
      return <Eye />
    case 'disable':
      return <EyeOff />
    case 'email':
      return <Mail />
    case 'fname':
      return <FolderPen />
    case 'username':
      return <ContactIcon />
    case 'address':
      return <NotebookTabs />
    case 'building':
      return <Building />
    case 'dollar':
      return <CircleDollarSign />
    case 'service':
      return <Bath />
    case 'location':
      return <NotebookTabs />
    case 'market':
      return <Store />
    case 'study':
      return <BookOpenText />
    case 'restaurant':
      return <ChefHat />
    case 'kitchen':
      return <CookingPot />
    default:
      return <></>
  }
}
