export function Steps({ ActiveStep }: { ActiveStep: string }) {
  const allSteps = [
    {
      id: '1',
      label: 'Upload emails',
    },
    {
      id: '2',
      label: 'Select template',
    },
    {
      id: '3',
      label: 'Select link',
    },
    {
      id: '4',
      label: 'Send',
    },
  ]

  return (
    <div className="mx-auto flex max-w-4xl justify-between gap-x-6  p-2">
      {allSteps.map((step) => {
        const active = step.id == ActiveStep ? true : false
        return (
          <div className="flex items-center gap-x-2" key={step.id}>
            <a
              className={`${
                active ? 'bg-sky-400 font-bold text-white' : 'text-black'
              } flex h-6 w-6 items-center justify-center rounded-full border `}
              href=""
            >
              {step.id}
            </a>
            <p className="text-lg font-medium">{step.label}</p>
          </div>
        )
      })}
    </div>
  )
}
