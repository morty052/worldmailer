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
    <div className="mx-auto w-full max-w-lg ">
      <h3 className="text-center">Select Template</h3>
      <p className="text-center">click on any template to preview it</p>
      <div className="mb-8 flex justify-center gap-x-2">
        {templates.map((template) => (
          <span key={template.name} onClick={() => setPreviewing(template.name as emailTemplateNames)}>
            {template.name}
          </span>
        ))}
      </div>
      {TemplateTable[previewing]}
      <Button onClick={() => confirmTemplate(previewing)}>Confirm</Button>
    </div>
  )
}

export default TemplateGrid
