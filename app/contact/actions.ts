'use server'

import { createClient } from '@/lib/supabase/server'

export async function sendContactMessage(formData: {
  fromEmail: string
  subject: string
  body: string
}) {
  const fromEmail = formData.fromEmail?.trim()
  const subject = formData.subject?.trim()
  const body = formData.body?.trim()

  if (!fromEmail || !subject || !body) {
    return { success: false, error: 'Please fill in all fields.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(fromEmail)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('contact_messages').insert({
    from_email: fromEmail,
    subject,
    body,
  })

  if (error) {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true }
}
