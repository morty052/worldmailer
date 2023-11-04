import { useState } from 'react'
import { Employment } from './Employment'
import { NotionMagicLinkEmail } from './Notion'
import { Button } from 'src/components/ui/button'
import { supabaseReal } from 'src/lib/supabase'

type emailTemplateNames = 'EMPLOYMENT' | 'NOTION'

type Props = {
  confirmTemplate: ({
    TemplateName,
    logo,
    email,
    name,
  }: {
    TemplateName: emailTemplateNames
    logo: string
    email: string
    name: string
  }) => void
}

function TemplateGrid({ confirmTemplate }: Props) {
  const [previewing, setPreviewing] = useState<emailTemplateNames>('EMPLOYMENT')
  const [editing, setEditing] = useState(false)
  const [company, setCompany] = useState({
    name: '',
    email: '',
    logo: '',
  })
  const TemplateTable = {
    EMPLOYMENT: <Employment teamImage={company.logo} companyEmail={company.email} teamName={company.name} />,
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

  async function handlePreview(template: emailTemplateNames) {
    setPreviewing(template)
    setEditing(true)
  }

  async function uploadImagefile(file: File) {
    // Add your logic here to handle the image file upload
    console.log(file)
    const { data, error } = await supabaseReal.storage.from('logos').upload('public/avatar8.png', file)
    console.log(data, error)

    const { data: url } = await supabaseReal.storage.from('logos').getPublicUrl('public/avatar8.png')
    console.log(url)

    setCompany({
      ...company,
      logo: url.publicUrl,
    })

    // For example, you can use the FileReader API to read the file content and perform further processing

    // const reader = new FileReader()

    // reader.onload = async (event) => {
    //   // Access the file content
    //   const fileContent = event.target?.result as string
    //   const { data, error } = await supabaseReal.storage.from('logos').upload('public/avatar1.png', fileContent)
    //   console.log(data, error)
    //   const { data: url } = await supabaseReal.storage.from('logos').getPublicUrl('folder/avatar1.png')
    //   console.log(url)
    //   setCompany({
    //     ...company,
    //     logo: url.publicUrl,
    //   })

    //   // Perform further processing with the file content
    //   // For example, you can send the file to a server or update the state with the uploaded image

    //   console.log(fileContent)
    // }

    // reader.onerror = (error) => {
    //   // Handle any errors that occur during file reading
    //   console.error('Error reading file:', error)
    // }

    // // Read the file as text
    // reader.readAsText(file)
  }

  return (
    <div className="flex w-full flex-col  ">
      <div className="py-4">
        <h3 className="text-center text-2xl font-semibold">Select Template</h3>
        <p className="text-center">
          click on any template to preview it. <br /> then click confirm to use template for your email
        </p>
      </div>

      {/* DEFAULT VIEW */}
      {!editing && (
        <div className="mx-auto grid  max-w-5xl grid-cols-6 items-start gap-x-4">
          {/* TEMPLATE BUTTONS */}
          <div className="col-span-2 flex flex-col  gap-x-2 bg-red-300">
            {templates.map((template) => (
              <span key={template.name} onClick={() => handlePreview(template.name as emailTemplateNames)}>
                {template.name}
              </span>
            ))}
            <Button onClick={() => confirmTemplate(previewing)}>Preview</Button>
          </div>
          {/* TEMPLATE BUTTONS END */}

          {/* TEMPLATE VIEW */}
          <div className="col-span-4 bg-blue-400">{TemplateTable[previewing]}</div>
          {/* TEMPLATE VIEW END */}
        </div>
      )}
      {/* DEFAULT VIEW END */}

      {/* EDIT VIEW */}
      {editing && (
        <div className="mx-auto grid max-w-4xl grid-cols-8 items-stretch gap-x-4">
          <div className="col-span-3 flex flex-col gap-y-4 border px-4 pt-8">
            <Button onClick={() => setEditing(false)}>Back</Button>
            <form className="space-y-4">
              <div className="">
                <label htmlFor=""></label>
                <input
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  className="rounded border p-2"
                  placeholder="your company name"
                  type="text"
                />
              </div>
              <div className="">
                <label htmlFor=""></label>
                <input
                  value={company.email}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  className="rounded border p-2"
                  placeholder="your company email"
                  type="text"
                />
              </div>
              {/* company image input*/}
              <label htmlFor="">upload image</label>
              <input onChange={(e) => uploadImagefile(e.target.files?.[0])} type="file" />
            </form>
            <Button
              onClick={() =>
                confirmTemplate({
                  TemplateName: previewing,
                  logo: company.logo,
                  email: company.email,
                  name: company.name,
                })
              }
            >
              Confirm
            </Button>
          </div>
          <div className="col-span-5 border px-4">{TemplateTable[previewing]}</div>
        </div>
      )}
      {/* EDIT VIEW END */}
    </div>
  )
}

export default TemplateGrid
