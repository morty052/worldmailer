import { Button } from 'src/components/ui/button'
import { Wand } from 'lucide-react'
import { useState, useReducer } from 'react'
import { dashboardReducer, dashboardState } from './reducer'
import TemplateGrid from '../emailtemplates/TemplateGrid'
import { useNavigate } from 'react-router-dom'
import { Header } from 'src/components/header'
import { Steps, UploadView } from './components'
import { supabase } from 'src/lib/supabase'

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

async function invoke_protocol(file: string) {
  const { data } = await supabase.functions.invoke('get_emails', {
    body: { file },
  })

  const { emailArray } = data

  console.log(data)

  return emailArray
}

function SideBar() {
  return (
    <div className="sidebar w-[254px]  ">
      <Button className="bg-lime-300 text-black">Invoke protocol</Button>
      <Button className="bg-lime-300 text-black">Templates</Button>
      <Button className="bg-lime-300 text-black">Emails</Button>
    </div>
  )
}

function SelectTemplate({ confirmTemplate }: { confirmTemplate: (s: string) => void }) {
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

type personalizedMail = {
  username: string
  email: string
}

function EmailPreview({ emails, handleEndPreview }: { emails: string[]; handleEndPreview: () => void }) {
  const [personalized, setPersonalized] = useState<null | personalizedMail[]>(null)

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
      <div className=" mx-auto   flex h-96 flex-col items-center justify-center gap-y-8 overflow-scroll rounded-xl border bg-gray-200   p-8 font-serif text-2xl font-medium">
        {!personalized && (
          <div className="space-y-2">
            {emails?.map((email: string, index: number) => {
              const count = index + 1

              return (
                <div key={index} className="flex items-center gap-x-4">
                  <p>{count}.</p>
                  <p>{email}</p>
                </div>
              )
            })}
          </div>
        )}
        {personalized && (
          <div className="space-y-2">
            {personalized?.map((email: personalizedMail, index: number) => {
              const count = index + 1

              return (
                <div key={index} className="flex items-center gap-x-2">
                  <p>{count}.</p>
                  <p>{email.email}</p>
                  <div className="ml-4">
                    <p>{email.username}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className=" space-y-4 px-2">
        <Steps ActiveStep="1" />
        <p className="text-center text-xl font-semibold text-gray-800">
          Confirm or personalize your uploaded emails to continue
        </p>
        <div className="relative mx-auto flex w-full  max-w-4xl flex-col items-center space-y-4">
          <EmailView />
          <button
            className=" w-full max-w-sm rounded-lg bg-sky-400 px-2 py-2.5 text-lg font-medium shadow"
            onClick={handleEndPreview}
          >
            Confirm emails
          </button>
          <button
            onClick={GetPersonalizedMails}
            className=" flex items-center gap-x-2 rounded-full border border-sky-400 px-4 py-1.5"
          >
            <Wand size={24} color="#12a1de" />
            <p>Personalize emails</p>
          </button>
        </div>
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
  /**
   * Uploads a text file and returns a Promise that resolves with the file's content.
   *
   * @param {HTMLInputElement} fileInput - The HTML input element where the user selects the file.
   * @return {Promise<string>} A Promise that resolves with the content of the uploaded file.
   */

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

  function handleSelectTemplate(template: string) {
    dispatch({ type: 'SELECT_TEMPLATE', payload: { template } })
    console.log(template)
  }

  function handleSelectLink(link: string) {
    dispatch({ type: 'SELECT_LINK', payload: { link } })
  }

  return (
    <div className="">
      <Header />
      {/* <SideBar /> */}

      <div className="layout py-8">
        {/* <SideBar invoke_protocol={() => invoke_protocol()} /> */}
        <div className=" pt-14">
          {!uploaded && (
            <UploadView uploadTextFile={uploadTextFile} sendEmails={sendEmails} emails={emails} setEmails={setEmails} />
          )}
          {previewingEmails && <EmailPreview handleEndPreview={handleEndEmailPreview} emails={emails} />}
          {previewingTemplate && <SelectTemplate confirmTemplate={(template) => handleSelectTemplate(template)} />}
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
    </div>
  )
}
