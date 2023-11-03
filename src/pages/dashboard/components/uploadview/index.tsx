import { Upload } from 'lucide-react'
import { Steps } from '../steps'

export function UploadView({ uploadTextFile }: { uploadTextFile: (file: any) => Promise<string> }) {
  return (
    <div className="p-4">
      {<Steps ActiveStep="1" />}
      <div className="upload ">
        <Upload color="gray" size={100} />
        <input onChange={(e) => uploadTextFile(e.target)} type="file" id="fileInput" />
        {/* <Button onClick={handleUpload}> upload emails</Button> */}
      </div>
    </div>
  )
}
