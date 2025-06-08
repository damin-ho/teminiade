// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zpuwnvdukidfapgrukhu.supabase.co' // ← replace this
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdXdudmR1a2lkZmFwZ3J1a2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5OTE0MzIsImV4cCI6MjA2NDU2NzQzMn0.8Hx8sSn4ZJ48lR2xsmcILfLUZI76s7k4FmM_w6h3ggg'                   // ← replace this

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
