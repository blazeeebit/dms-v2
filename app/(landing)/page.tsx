import { HeroSection } from '@/components/landing/hero'
import { Navbar } from '@/components/navbar'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
    </div>
  )
}
