import { useState } from 'react'
import { Employment } from './Employment'
import { NotionMagicLinkEmail } from './Notion'
import { Button } from 'src/components/ui/button'

type emailTemplateNames = 'EMPLOYMENT' | 'NOTION'

type Props = {
  confirmTemplate: (name: emailTemplateNames) => void
}

function TemplateGrid({ confirmTemplate }: Props) {
  const [previewing, setPreviewing] = useState<emailTemplateNames>('EMPLOYMENT')
  const TemplateTable = {
    EMPLOYMENT: <Employment />,
    NOTION: <NotionMagicLinkEmail />,
  }

  const templates = [
    {
      name: 'EMPLOYMENT',
    },
    {
      name: 'NOTION',
    },
  ]

  return (
    <div className="flex w-full flex-col  ">
      <div className="py-4">
        <h3 className="text-center text-2xl font-semibold">Select Template</h3>
        <p className="text-center">
          click on any template to preview it. <br /> then click confirm to use template for your email
        </p>
      </div>

      <div className="mx-auto grid  max-w-4xl grid-cols-6 items-start gap-x-4">
        <div className="col-span-2 flex flex-col  gap-x-2 bg-red-300">
          {templates.map((template) => (
            <span key={template.name} onClick={() => setPreviewing(template.name as emailTemplateNames)}>
              {template.name}
            </span>
          ))}
          <Button onClick={() => confirmTemplate(previewing)}>Confirm</Button>
        </div>
        <div className="col-span-4 bg-blue-400">{TemplateTable[previewing]}</div>
      </div>
    </div>
  )
}

export default TemplateGrid
