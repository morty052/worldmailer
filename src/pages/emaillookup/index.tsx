import { Header } from 'src/components/header'
import { Button } from 'src/components/ui/button'
import { useState } from 'react'
import { supabase } from 'src/lib/supabase'
import { Upload, Check, X } from 'lucide-react'

function UploadView({ uploadTextFile }: { uploadTextFile: (file: any) => Promise<string> }) {
  return (
    <div className="p-4">
      <div className="upload ">
        <Upload color="gray" size={100} />
        <input onChange={(e) => uploadTextFile(e.target)} type="file" id="fileInput" />
        {/* <Button onClick={handleUpload}> upload emails</Button> */}
      </div>
    </div>
  )
}

function VerifiedEmail(params: type) {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400">
      <Check size={12} />
    </div>
  )
}
function UnVerifiedEmail(params: type) {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-700">
      <X size={12} />
    </div>
  )
}

export function EmailLookup(params: type) {
  const [emails, setEmails] = useState<null | string[]>(null)
  const [verifiedEmails, setVerifiedEmails] = useState<null | { status: string; email: string }[]>(null)

  async function invoke_protocol(file: string) {
    const { data } = await supabase.functions.invoke('get_emails', {
      body: { file },
    })

    const { emailArray } = data

    console.log(data)

    return emailArray
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
        resolve(fileContent)
      }

      reader.onerror = (error) => {
        reject(new Error('Error reading file: ' + error))
      }

      reader.readAsText(file)
    })
  }

  const checkEmail = async (email: string) => {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=c9da5a5bfe8a4967a9f0b6cd04f7e75e&email=${email}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const { deliverability } = data

    let status: 'DELIVERABLE' | 'UNDELIVERABLE' | 'NULL' = 'NULL'

    switch (deliverability) {
      case 'DELIVERABLE':
        status = 'DELIVERABLE'
        break
      case 'UNDELIVERABLE':
        status = 'UNDELIVERABLE'
        break
      default:
        break
    }

    console.log(status)

    return status
  }

  const checkBulkEmail = async (emails: string[]) => {
    const results = []

    for (const email of emails) {
      const response = await checkEmail(email)
      const status = response

      results.push({ email, status })

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    console.log(results)
    setVerifiedEmails(results)
    return results
  }

  return (
    <div className="">
      <Header />
      <div className="pt-16">
        <h3 className="text-center">Email lookup</h3>
        {!emails && <UploadView uploadTextFile={uploadTextFile} />}

        <div className="mx-auto flex max-w-4xl justify-center py-4 ">
          {emails && !verifiedEmails && (
            <div className="space-y-4">
              <div className="">
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
              <div className="">
                <Button onClick={() => checkBulkEmail([emails[0], emails[1]])}>check email</Button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-y-2 border">
            {verifiedEmails &&
              verifiedEmails.map((email: { status: string; email: string }, index: number) => {
                const count = index + 1
                return (
                  <div key={index} className="flex items-center gap-x-2">
                    <div className="flex flex-1 gap-x-2">
                      <p>{count}.</p>
                      <p>{email.email}</p>
                    </div>
                    <div className="">{email.status == 'DELIVERABLE' ? <VerifiedEmail /> : <UnVerifiedEmail />}</div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
