// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { Resend } from 'https://esm.sh/resend@1.1.0'
import Welcome from './emails/Welcome.tsx'
const resend = new Resend('re_hBwZyUvG_44z8Ne6XHHB859sdsfMckREQ')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const props = {
  username: 'neal',
}

async function send(to: string) {
  try {
    const data = await resend.emails.send({
      from: 'Getting serious <onboarding@pguild.xyz>',
      to: [`${to}`],
      subject: 'Now sending bulk emails',
      react: Welcome(props),
    })

    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

Deno.serve(async (req) => {
  // send()

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { emailArray } = await req.json()

  console.log(emailArray)
  emailArray.forEach(async (email: string) => {
    await send(email)
  })

  const data = {
    message: `all emails sent`,
  }

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
