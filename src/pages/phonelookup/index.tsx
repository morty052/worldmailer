import React, { useState } from 'react'
import { Header } from 'src/components/header'
import { supabase } from 'src/lib/supabase'
import { UploadView } from '../dashboard/components'
import { Button } from 'src/components/ui/button'

async function invoke_protocol(file: string) {
  const { data } = await supabase.functions.invoke('get_phones', {
    body: { file },
  })
  console.log(data)
  const { phoneArray } = data
  //   const cleanPhoneArray = phoneArray.map((phone: string) => {
  //     const cleanPhone = phone.match(regex)
  //     return cleanPhone
  //   })

  //   console.log(cleanPhoneArray)

  return phoneArray
}

export function PhoneLookup() {
  const [phones, setPhones] = useState<null | string[]>(null)
  const [verifiedPhones, setVerifiedPhones] = useState<null | { phone: string; type: string; valid: boolean }[]>(null)
  const [invalidPhones, setInvalidPhones] = useState<null | { phone: string; type: string; valid: boolean }[]>(null)
  const [allPhones, setAllPhones] = useState<null | { phone: string; type: string; valid: boolean }[]>(null)

  async function checkPhone(phone: string) {
    const options = { method: 'GET' }

    const response = await fetch(
      `https://phonevalidation.abstractapi.com/v1?api_key=ad18548df96e40f281b600ec25642779&phone=${phone}`,
      options,
    )

    const data = await response.json()
    const { type, valid } = data
    console.log(data)

    return { type, valid }
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
        const phones = await invoke_protocol(fileContent)
        setPhones(phones)
        resolve(fileContent)
      }

      reader.onerror = (error) => {
        reject(new Error('Error reading file: ' + error))
      }

      reader.readAsText(file)
    })
  }

  const checkBulkPhones = async (phones: string[]) => {
    const results = []

    for (const phone of phones) {
      const response = await checkPhone(phone)
      const { type, valid } = response

      results.push({ phone, type, valid })

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    console.log(results)
    // setVerifiedEmails(results)
    const validPhones = results.filter((phone) => phone.valid)
    const invalidPhones = results.filter((phone) => !phone.valid)
    setAllPhones(results)
    setVerifiedPhones(validPhones)
    setInvalidPhones(invalidPhones)
    return results
  }

  return (
    <div>
      <Header />
      <div className="pt-16">
        <p className="text-center">Validate phone</p>

        {!phones && <UploadView uploadTextFile={uploadTextFile} />}

        {phones && !verifiedPhones && (
          <div className="">
            {phones?.map((phone: string, index: number) => {
              const count = index + 1
              return (
                <div key={index} className="flex items-center gap-x-4">
                  <p>{count}.</p>
                  <p>{phone}</p>
                </div>
              )
            })}
            <div className="">
              <Button onClick={() => checkBulkPhones(phones)}>Validate</Button>
            </div>
          </div>
        )}

        {verifiedPhones && (
          <div className="mx-auto mt-4 grid h-screen max-h-96 max-w-4xl grid-cols-2 divide-x-2">
            <div className="flex flex-col">
              <p className="text-center">Valid</p>
              <div className=" border-t">
                <div className="pl-8 pt-2">
                  {verifiedPhones?.map((phone: any, index: number) => {
                    const count = index + 1
                    return (
                      <div key={index} className="flex items-center gap-x-4">
                        <p>{count}.</p>
                        <p>{phone.phone}</p>
                        <p>{phone.valid ? 'valid' : 'invalid'}</p>
                        <p>{phone.type}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-center">Invalid</p>
              <div className=" border-t">
                <div className="pl-8 pt-2">
                  {invalidPhones?.map((phone: any, index: number) => {
                    const count = index + 1
                    return (
                      <div key={index} className="flex items-center gap-x-4">
                        <p>{count}.</p>
                        <p>{phone.phone}</p>
                        <p>{phone.valid ? 'valid' : 'invalid'}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
