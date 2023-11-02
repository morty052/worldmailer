import { createClient } from '@supabase/supabase-js'
import { Button } from 'src/components/ui/button'
import { Upload } from 'lucide-react'
import { useState, useReducer } from 'react'
import { dashboardReducer, dashboardState } from './reducer'
import TemplateGrid from '../emailtemplates/TemplateGrid'
import { useNavigate } from 'react-router-dom'

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
    <div className="sidebar  ">
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
    <div className="p-4">
      <Steps ActiveStep="1" />
      <div className="upload mt-8">
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
      <TemplateGrid active="EMPLOYMENT" />
      <div className="mx-auto flex  max-w-md justify-center">
        <Button onClick={confirmTemplate}>Confirm</Button>
      </div>
    </div>
  )
}

type personalizedMail = {
  username: string
  email: string
}

function EmailPreview({ emails, handleEndPreview }: { emails: string[]; handleEndPreview: () => void }) {
  const [personalized, setPersonalized] = useState<null | personalizedMail[]>(null)

  function handleEmailPersonalization(email: string | undefined) {
    const cleanEmail = email.replace(/\d*@(.*?)(?:\.|$).*/, '')
    console.log(cleanEmail)
  }

  function GetPersonalizedMails() {
    const personalizedMails = emails?.map((email: string) => {
      const cleanEmail = email.replace(/\d*@(.*?)(?:\.|$).*/, '')
      return {
        username: cleanEmail,
        email: email,
      }
    })

    // const emailAndUsernames = [...personalizedMails, ...emails]

    console.log(personalizedMails)
    setPersonalized(personalizedMails)
    return personalizedMails
  }

  function EmailView() {
    return (
      <div className="  mx-auto flex max-w-xl flex-col items-center justify-center gap-y-6 bg-white p-4">
        {!personalized && (
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
        )}
        {personalized && (
          <div className="">
            {personalized?.map((email: personalizedMail, index: number) => {
              const count = index + 1

              return (
                <div key={index} className="flex items-center gap-x-2">
                  <p>{count}</p>
                  <p>{email.email}</p>
                  <p>{email.username}</p>
                </div>
              )
            })}
          </div>
        )}
        <Button onClick={handleEndPreview}>Confirm emails</Button>
      </div>
    )
  }

  return (
    <>
      <div className="h-screen bg-red-300 px-2">
        <Steps ActiveStep="1" />
        <EmailView />
        <Button onClick={() => GetPersonalizedMails()}>Personalize emails</Button>
      </div>
    </>
  )
}

function LinkSelect({ confirmLink }: { confirmLink: (link: string) => void }) {
  const links = [
    {
      name: 'Vercel',
      url: 'https://vercel.com',
    },
    {
      name: 'Supabase',
      url: 'https://supabase.com',
    },
  ]

  return (
    <div className="px-2">
      <Steps ActiveStep="3" />
      <div className="mx-auto flex max-w-md flex-col items-center gap-y-8 bg-blue-400 py-4">
        <div className="">
          {links.map((link) => (
            <div onClick={() => confirmLink(link.url)} key={link.name} className="flex items-center gap-x-2">
              <p>{link.name}</p>
              <p>{link.url}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-x-2">
          <input className="rounded-lg px-2 placeholder:text-sm" placeholder="Enter custom Link" type="text" />
          <Button onClick={() => null}>Select Link</Button>
        </div>
      </div>
    </div>
  )
}

function PreviewSend({ handleSend }: { handleSend: () => void }) {
  return (
    <>
      <Steps ActiveStep="4" />
      <div className="mx-auto flex max-w-md justify-center">
        <Button onClick={handleSend}>Confirm Send</Button>
      </div>
    </>
  )
}

export function Dashboard() {
  const [file, setfile] = useState('')
  const [emails, setEmails] = useState<null | string[]>(null)

  const [state, dispatch] = useReducer(dashboardReducer, dashboardState)
  const navigate = useNavigate()

  const { uploaded, previewingEmails, previewingTemplate, selectingLink, sending, template, link } = state

  async function sendEmails() {
    await supabase.functions.invoke('email_handler', {
      body: { emailArray: emails, link, template },
    })
  }

  function handleDoneUpload(emails: any) {
    setEmails(emails)
    console.log(emails)
    dispatch({ type: 'UPLOADED', payload: { emails } })
    // navigate('emailpreview')
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
        handleDoneUpload(emails)
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

  function handleSelectTemplate(template) {
    dispatch({ type: 'SELECT_TEMPLATE', payload: { template } })
  }

  function handleSelectLink(link: string) {
    dispatch({ type: 'SELECT_LINK', payload: { link } })
  }

  return (
    <div className="layout ">
      <SideBar invoke_protocol={() => invoke_protocol()} />
      <div className=" ml-[210px]  border border-green-300">
        {!uploaded && (
          <UploadView uploadTextFile={uploadTextFile} sendEmails={sendEmails} emails={emails} setEmails={setEmails} />
        )}
        {previewingEmails && <EmailPreview handleEndPreview={handleEndEmailPreview} emails={emails} />}
        {previewingTemplate && <TemplateGrid confirmTemplate={(template) => handleSelectTemplate(template)} />}
        {selectingLink && <LinkSelect confirmLink={(link) => handleSelectLink(link)} />}
        {sending && <PreviewSend handleSend={sendEmails} />}

        {/* <Routes>
          <Route
            path="/"
            element={
              <UploadView
                uploadTextFile={uploadTextFile}
                sendEmails={sendEmails}
                emails={emails}
                setEmails={setEmails}
              />
            }
          />
          <Route
            path="/emailpreview"
            element={<EmailPreview handleEndPreview={handleEndEmailPreview} emails={emails} />}
          />
          <Route path="/template" element={<TemplateGrid confirmTemplate={handleSelectTemplate} />} />
          <Route path="/selectlink" element={<LinkSelect confirmLink={(link) => handleSelectLink(link)} />} />
          <Route path="/send" element={<PreviewSend handleSend={sendEmails} />} />
        </Routes> */}
      </div>
    </div>
  )
}
