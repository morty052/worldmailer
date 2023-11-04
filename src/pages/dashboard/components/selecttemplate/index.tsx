import TemplateGrid from 'src/pages/emailtemplates/TemplateGrid'
import { Steps } from '../steps'

export function SelectTemplate({ confirmTemplate }: { confirmTemplate: (s: string) => void }) {
  return (
    <div className="">
      <Steps ActiveStep="2" />
      <TemplateGrid confirmTemplate={(template) => confirmTemplate(template)} />
      <div className="mx-auto flex  max-w-md justify-center">
        {/* <Button onClick={() => confirmTemplate('')}>Confirm</Button> */}
      </div>
    </div>
  )
}
