import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'http://localhost:54321',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
)

const supabaseUrl = 'https://jvqgakajjuwesvyufvmz.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2cWdha2FqanV3ZXN2eXVmdm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3ODgzMjAsImV4cCI6MjAxNDM2NDMyMH0.7xttOHb8-gXgu8o_Ut8liC2zvgy7oBNiVMh7hC2X6Xk'
export const supabaseReal = createClient(supabaseUrl, supabaseKey)
