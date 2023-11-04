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
  link: string
  logo: string
  teamName: string
  companyEmail: string
}

const baseUrl = `https://`

const Welcome = (props: emailProps) => {
  const { username, link, logo, teamName, companyEmail } = props ?? props
  const previewText = `Come work for us at  ${teamName} `

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid  px-[20px]">
            <Section className="mt-[32px]">
              <Img src={logo} width="40" height="37" alt="Vercel" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join us at <strong>{teamName ? teamName : '[your company name]'}</strong>
            </Heading>
            <Section className="pmx-20">
              <Text className="text-[14px] leading-[24px] text-black">Hello , {username}</Text>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              We are hiring from your region, come join the ever growing team at <br />
              <strong>{teamName ? teamName : '[your company name]'}</strong>. follow the link to apply.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={
                      'https://img.freepik.com/free-vector/happy-emoji_53876-25513.jpg?w=740&t=st=1699021786~exp=1699022386~hmac=6b49f04da829ef353985012d37614317c5313c221ceb37d17322749b039d3179'
                    }
                    width="64"
                    height="64"
                  />
                </Column>
                <Column align="center">
                  <Img
                    src={
                      'https://img.freepik.com/free-photo/white-arrow-black-background-with-thumbtack_23-2148445431.jpg?w=1060&t=st=1699040598~exp=1699041198~hmac=c2ef68dccc3403255072316664bc620ba1c5abc29d9387cd50e387e6a319c7f4'
                    }
                    width="16"
                    height="16"
                    alt="invited you to"
                  />
                </Column>
                <Column align="left">
                  <Img className="rounded-full" src={logo} width="64" height="64" />
                </Column>
              </Row>
            </Section>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-10 py-4 text-center text-[12px] font-semibold text-white no-underline"
                href={link}
              >
                Join the team
              </Button>
            </Section>
            {/* <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={'inviteLink'} className="text-blue-600 no-underline">
                {''}
              </Link>
            </Text> */}
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was sent to raise attention for open positions at{' '}
              <strong>{teamName ? teamName : '[your company name]'}</strong>. applying to any open position does not
              guarantee getting hired. {companyEmail && `If you have any questions, please contact ${companyEmail}.`}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Welcome
