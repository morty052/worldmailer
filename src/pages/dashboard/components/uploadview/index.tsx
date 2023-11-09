import { Upload } from 'lucide-react'
import { Steps } from '../steps'

export function UploadView({ uploadTextFile }: { uploadTextFile: (file: any) => Promise<string> }) {
  return (
    <div className="p-4">
      {<Steps ActiveStep="1" />}
      <div className="upload mt-8 ">
        <Upload color="gray" size={80} />
        <label className="cursor-pointer" htmlFor="fileInput">
          <a className="rounded-lg bg-black px-4 py-2 text-sm text-gray-50">Upload emails</a>
        </label>
        <input className="hidden" onChange={(e) => uploadTextFile(e.target)} type="file" id="fileInput" />
        <p className="text-center text-xs text-gray-700">
          Emails should be in a text file or csv format <br /> or you will get an error.
        </p>
      </div>
    </div>
  )
}
