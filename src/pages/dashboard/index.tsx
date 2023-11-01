import { createClient } from '@supabase/supabase-js'
import { Button } from 'src/components/ui/button'
import { Upload } from 'lucide-react'
import { useState, useReducer } from 'react'
import { dashboardReducer, dashboardState } from './reducer'
import { Employment } from '../emailtemplates/Employment'

function handleUpload() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement
  uploadTextFile(fileInput)
    .then((fileContent) => {
      console.log('File content:', fileContent)
    })
    .catch((error) => {
      console.error('Error uploading file:', error)
    })
}

const supabase = createClient(
  'http://localhost:54321',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
)

async function invoke_protocol(file: string) {
  const { data } = await supabase.functions.invoke('get_emails', {
    body: { file },
  })

  const { emailArray } = data

  console.log(data)

  return emailArray
}

function SideBar({ invoke_protocol }: { invoke_protocol: () => void }) {
  return (
    <div className="sidebar  flex flex-col space-y-8 shadow-2xl shadow-lime-900">
      <Button className="bg-lime-300 text-black" onClick={invoke_protocol}>
        Invoke protocol
      </Button>
      <Button className="bg-lime-300 text-black" onClick={invoke_protocol}>
        Templates
      </Button>
      <Button className="bg-lime-300 text-black" onClick={() => null}>
        Emails
      </Button>
    </div>
  )
}

function Steps({ ActiveStep }: { ActiveStep: string }) {
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
    <div className="mx-auto flex max-w-md justify-between p-2">
      {allSteps.map((step) => {
        const active = step.id == ActiveStep ? true : false
        return (
          <div className="flex items-center gap-x-2" key={step.id}>
            <a className={`${active ? 'bg-lime-300' : ''} text-black`} href="">
              {step.id}
            </a>
            <p>{step.label}</p>
          </div>
        )
      })}
    </div>
  )
}

function UploadView({
  uploadTextFile,
}: {
  emails: null | string[]
  setEmails: (emails: null | string[]) => void
  uploadTextFile: (file: any) => Promise<string>
  sendEmails: () => void
}) {
  return (
    <div className="">
      <div className="upload">
        <Upload color="gray" size={100} />
        <input onChange={(e) => uploadTextFile(e.target)} type="file" id="fileInput" />
        {/* <Button onClick={handleUpload}> upload emails</Button> */}
      </div>
    </div>
  )
}

function SelectTemplate({ confirmTemplate }: { confirmTemplate: () => void }) {
  return (
    <div className="pb-20">
      <Steps ActiveStep="2" />
      <div className="my-4 w-full">
        <h3 className="text-center">Select Template</h3>
      </div>
      <Employment />
      <div className="mx-auto flex  max-w-md justify-center">
        <Button onClick={confirmTemplate}>Confirm</Button>
      </div>
    </div>
  )
}

function EmailPreview({ emails, handleEndPreview }: { emails: null | string[]; handleEndPreview: () => void }) {
  function EmailView() {
    return (
      <div className="  mx-auto flex max-w-xl flex-col items-center justify-center gap-y-6 bg-white p-4">
        <div className="">
          {emails?.map((email: string, index: number) => {
            const count = index + 1

            return (
              <div key={index} className="flex items-center gap-x-2">
                <p>{count}</p>
                <p>{email}</p>
              </div>
            )
          })}
        </div>
        <Button onClick={handleEndPreview}>Confirm emails</Button>
      </div>
    )
  }

  return (
    <>
      <div className="h-screen bg-red-300 px-2">
        <Steps ActiveStep="1" />
        <EmailView />
      </div>
    </>
  )
}

function LinkSelect({ confirmLink }: { confirmLink: () => void }) {
  return (
    <div className="px-2">
      <Steps ActiveStep="3" />
      <Button onClick={confirmLink}>Select Link</Button>
    </div>
  )
}

function PreviewSend() {
  return (
    <>
      <Steps ActiveStep="4" />
      <div className="mx-auto flex max-w-md justify-center">
        <Button>Confirm Sens</Button>
      </div>
    </>
  )
}

export function Dashboard() {
  const [file, setfile] = useState('')
  const [emails, setEmails] = useState<null | string[]>(null)

  const [state, dispatch] = useReducer(dashboardReducer, dashboardState)

  async function sendEmails() {
    await supabase.functions.invoke('email_handler', {
      body: { emailArray: emails },
    })
  }
  function uploadTextFile(fileInput: HTMLInputElement): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = fileInput.files?.[0]
      if (!file) {
        reject(new Error('No file selected'))
        return
      }

      const reader = new FileReader()

      reader.onload = async (event) => {
        const fileContent = event.target?.result as string
        const emails = await invoke_protocol(fileContent)
        setEmails(emails)
        console.log(emails)
        dispatch({ type: 'UPLOADED', payload: { emails } })
        resolve(fileContent)
      }

      reader.onerror = (error) => {
        reject(new Error('Error reading file: ' + error))
      }

      reader.readAsText(file)
    })
  }

  function handleEndEmailPreview() {
    dispatch({ type: 'END_EMAIL_PREVIEW' })
  }

  function handleSelectTemplate() {
    dispatch({ type: 'SELECT_TEMPLATE' })
  }

  function handleSelectLink() {
    dispatch({ type: 'SELECT_LINK' })
  }

  const { uploaded, previewingEmails, previewingTemplate, selectingLink, sending } = state

  return (
    <>
      {!uploaded && (
        <main className="flex  h-screen  ">
          <SideBar invoke_protocol={() => invoke_protocol()} />
          <section className="container mx-auto max-w-7xl   p-2">
            <Steps ActiveStep="1" />
            <div className="flex h-3/4 flex-col items-center justify-center  pb-20">
              <UploadView
                uploadTextFile={uploadTextFile}
                sendEmails={sendEmails}
                emails={emails}
                setEmails={setEmails}
              />
            </div>
          </section>
        </main>
      )}
      {previewingEmails && <EmailPreview handleEndPreview={handleEndEmailPreview} emails={emails} />}
      {previewingTemplate && <SelectTemplate confirmTemplate={handleSelectTemplate} />}
      {selectingLink && <LinkSelect confirmLink={handleSelectLink} />}
      {sending && <PreviewSend />}
    </>
  )
}
