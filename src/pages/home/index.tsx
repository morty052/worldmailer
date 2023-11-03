import { useTranslation } from 'react-i18next'
import { Hero } from 'src/components/hero'

function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 ">
      <section className="mx-auto flex max-w-[1440px] justify-between p-4 ">
        <span className="text-2xl font-semibold text-white">Evol Genius</span>
        <div className="flex gap-x-6">
          <span className="text-2xl font-semibold text-white">Features</span>
          <span className="text-2xl font-semibold text-white">Docs</span>
          <span className="text-2xl font-semibold text-white">Pricing</span>
          <span className="text-2xl font-semibold text-white">Sign up</span>
          <span className="text-2xl font-semibold text-white">Log in</span>
        </div>
      </section>
    </nav>
  )
}

export default function Home() {
  const { t } = useTranslation('translation')
  return (
    <>
      <Navbar />
      <div className=" min-h-screen bg-gradient-to-b from-black/90 to-black/95">
        <Hero />
        <div className="">
          <p>CSS HARD ABEG</p>
        </div>
      </div>
    </>
  )
}
