import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import heroimage from '../../assets/heroimage.png'

export const Hero = () => {
  const { t } = useTranslation()

  return (
    <div className="grid   items-center  lg:grid-cols-2 lg:px-6 lg:pt-16 ">
      {/* TITLE */}
      <section className="flex flex-col gap-y-2  px-4  lg:pb-40">
        <p className="text-3xl font-bold leading-relaxed tracking-wide text-sky-500 md:text-7xl">
          <span className="text-white">Evol</span> Genius
        </p>
        <p className="font-space_grotesk text-4xl font-semibold text-gray-50">
          The Complete email solution <br /> for hustlers by hustlers
        </p>

        <div className="mt-6 hidden lg:block">
          <Link
            to={'/bulkmail'}
            className="flex max-w-xs justify-center rounded-xl border border-sky-500 px-6 py-4 text-4xl font-semibold text-gray-50 duration-150 ease-in hover:border-2 hover:border-lime-300 hover:bg-white hover:text-gray-800"
          >
            Get Started <span className="ml-2">&#8594;</span>
          </Link>
        </div>
      </section>
      {/* IMAGE */}
      <section className=" relative flex w-fit  p-4 lg:pb-40">
        <img className=" z-10 w-full" src={heroimage} alt="" />
        <div className="radial_bg absolute inset-0    max-w-[600px]"></div>
      </section>
    </div>
  )
}
