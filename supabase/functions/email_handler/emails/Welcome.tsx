import React from 'https://esm.sh/react'
// import { Html, Button, TW } from "./Components.tsx";

// export default function Welcome() {
//   return (
//     <TW>
//       <Html>
//         <Button
//           href="https://example.com"
//           className="bg-red-600 text-white p-8 rounded-lg"
//         >
//           Click me
//         </Button>
//       </Html>
//     </TW>
//   );
// }

import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'https://esm.sh/@react-email/components'

interface VercelInviteUserEmailProps {
  username?: string
  userImage?: string
  invitedByUsername?: string
  invitedByEmail?: string
  teamName?: string
  teamImage?: string
  inviteLink?: string
  inviteFromIp?: string
  inviteFromLocation?: string
}

type emailProps = {
  username: string
}

const baseUrl = `https://`

const Welcome = (props: emailProps) => {
  const previewText = `Join ${'invitedByUsername'} on Vercel`
  const { username } = props ?? props

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid  px-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${'baseUrl'}/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{''}</strong> on <strong>Vercel</strong>
            </Heading>
            <Section className="pmx-20">
              <Text className="text-[14px] leading-[24px] text-black">Hello , {username}</Text>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>bukinoshita</strong> (
              <Link href={`mailto:${''}`} className="text-blue-600 no-underline">
                {'invitedByEmail'}
              </Link>
              ) has invited you to the <strong>{'yek'}</strong> team on <strong>Vercel</strong>.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img className="rounded-full" src={''} width="64" height="64" />
                </Column>
                <Column align="center">
                  <Img src={`${baseUrl}/static/vercel-arrow.png`} width="12" height="9" alt="invited you to" />
                </Column>
                <Column align="left">
                  <Img className="rounded-full" src={'https://avatars.dicebear.com'} width="64" height="64" />
                </Column>
              </Row>
            </Section>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-10 py-4 text-center text-[12px] font-semibold text-white no-underline"
                href={''}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={'inviteLink'} className="text-blue-600 no-underline">
                {''}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for <span className="text-black">{''} </span>.This invite was sent from{' '}
              <span className="text-black">{'244.178.44.111'}</span> located in{' '}
              <span className="text-black">{'São Paulo'}</span>. If you were not expecting this invitation, you can
              ignore this email. If you are concerned about your account safety, please reply to this email to get in
              touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Welcome
