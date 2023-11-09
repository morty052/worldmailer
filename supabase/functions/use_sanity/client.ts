import { createClient } from 'https://esm.sh/@sanity/client@6.7.1'

export const client = createClient({
  projectId: 'znsrdwgn',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token:
    'skXh5cnrPT06mNlZgU3ZXiPUkLF1X6mG84XuajxAnPBuhwVfmXaQCRTQGmIWkUDQgEOjb7q6SPINSFl63WDTE5EQnPWUFDAT7f91POcVlJ7qvkJZzXpF9kqeLBwcv3D3ggXxh0ucuiIZfe4HiTX4ZAjIEKJjgjL3Xq753O0wdC6vxKYdEDkF',
})

export async function getDocs(email: { email: string }) {
  console.log(email)
  const query = `*[_type == 'users' && email == "${email}"]`
  const data = await client.fetch(query)
  return data
}
