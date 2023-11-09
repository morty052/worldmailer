import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text } from '@react-email/components'
import * as React from 'react'

interface NotionMagicLinkEmailProps {
  loginCode?: string
  companyName?: string
  logo?: string
}

export const NotionMagicLinkEmail = ({
  loginCode = 'sparo-ndigo-amurt-secan',
  companyName,
  logo,
}: NotionMagicLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You qualify</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Img src={logo} width="52" height="52" alt="Notion's Logo" />
          </Section>
          <Heading style={heading}>{!companyName ? '[Your Company name]' : companyName}</Heading>
          {/* <Section style={section}>
          </Section> */}
          <Heading style={h1}>You are qualified!</Heading>
          {/* <Link
          href="https://notion.so"
          target="_blank"
          style={{
            ...link,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Click here to log in with this magic link
        </Link> */}
          <Text style={{ ...text, marginBottom: '14px' }}>
            Hello {'[Your Name]'}, great news! you are qualified to apply for a grant from us. visit
            www.northwestgrants.com or click the button below to get started.
          </Text>
          <code style={code}>{loginCode}</code>
          {/* <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '14px',
              marginBottom: '16px',
            }}
          >
            If you didn&apos;t try to login, you can safely ignore this email.
          </Text> */}
          <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '12px',
              marginBottom: '38px',
            }}
          >
            www.northwestgrants.com.
          </Text>
          {/* <Section style={{ margin: '10px' }}>
            <Img src={logo} width="32" height="32" alt="Notion's Logo" />
          </Section> */}
          {/* <Text style={footer}>
            <Link href="https://notion.so" target="_blank" style={{ ...link, color: '#898989' }}>
              Notion.so
            </Link>
            , the all-in-one-workspace
            <br />
            for your notes, tasks, wikis, and databases.
          </Text> */}
        </Container>
      </Body>
    </Html>
  )
}

export default NotionMagicLinkEmail

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '10px 0',
  padding: '0',
}
const heading = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '10px',
  padding: '0',
  textAlign: 'center',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
}

const section = {
  display: 'flex',
  justifyContent: 'center',
}
