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
  Text,
} from '@react-email/components'

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

const baseUrl = `https://`

export const Employment = ({
  username,
  userImage = `${baseUrl}/static/vercel-user.png`,
  invitedByUsername = 'bukinoshita',
  invitedByEmail = 'bukinoshita@example.com',
  teamName = 'My Project',
  teamImage = `${baseUrl}/static/vercel-team.png`,
  inviteLink = 'https://vercel.com/teams/invite/foo',
  inviteFromIp = '204.13.186.218',
  inviteFromLocation = 'São Paulo, Brazil',
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Vercel`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      {/* <Tailwind>
      </Tailwind> */}
      <Body className="mx-auto  bg-white font-sans">
        <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid  px-[20px]">
          <Section className="mt-[32px]">
            <Img
              src={`${baseUrl}/static/vercel-logo.png`}
              width="40"
              height="37"
              alt="Vercel"
              className="mx-auto my-0"
            />
          </Section>
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            Join us at <strong>Vercel</strong>
          </Heading>
          <Section className="mx-4">
            <Text className="text-[14px] leading-[24px] text-black">Hello {username},</Text>
          </Section>
          <Section style={{ margin: '0 0 16px 16px' }} className="mx-4">
            <Text className=" text-[14px] leading-[24px] text-black">
              We are hiring from your region, come join the ever growing team at <br />
              <strong>{teamName ? teamName : 'your company name'}</strong>. follow the link to apply.
            </Text>
          </Section>
          <Section>
            <Row>
              <Column align="right">
                <Img className="rounded-full" src={userImage} width="64" height="64" />
              </Column>
              <Column align="center">
                <Img src={`${baseUrl}/static/vercel-arrow.png`} width="12" height="9" alt="invited you to" />
              </Column>
              <Column align="left">
                <Img className="rounded-full" src={teamImage} width="64" height="64" />
              </Column>
            </Row>
          </Section>
          <Section className="mb-[32px] mt-[32px] text-center">
            <Button
              style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '16px', paddingBottom: '16px' }}
              className="rounded bg-[#000000] px-10 py-4 text-center text-[12px] font-semibold text-white no-underline"
              href={inviteLink}
            >
              Join the team
            </Button>
          </Section>
          {/* <Text className="text-[14px] leading-[24px] text-black">
            or copy and paste this URL into your browser:{' '}
            <Link href={inviteLink} className="text-blue-600 no-underline">
              {inviteLink}
            </Link>
          </Text> */}
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            This invitation was sent to raise attention for open positions at {teamName}. applying to any open position
            does not guarantee getting hired
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
