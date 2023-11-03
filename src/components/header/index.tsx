import { Link } from 'react-router-dom'

export function Header() {
  return (
    <nav className="fixed inset-x-0 bg-black">
      <section className="mx-auto flex max-w-[1440px] justify-between p-4 ">
        <span className="text-2xl font-semibold text-white">Evol Genius</span>
        <div className="flex gap-x-6">
          <Link to={'/bulkmail'} className=" font-semibold text-white">
            Bulk Mail
          </Link>
          <span className=" font-semibold text-white">Single Mail</span>
          <Link to={'/emaillookup'} className=" font-semibold text-white">
            Validate Email
          </Link>
          <Link to={'/phonelookup'} className=" font-semibold text-white">
            Validate Phone
          </Link>
        </div>
      </section>
    </nav>
  )
}
