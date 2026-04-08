export type SessionStatus = 'pending' | 'in_progress' | 'completed'
export type Engine = 'growth' | 'efficiency' | 'adaptability'
export type NoteEngine = Engine | 'overall'
export type MaturityTier = 'Foundational' | 'Developing' | 'Scaling' | 'Leading'

export interface Session {
  id: string
  token: string
  status: SessionStatus
  company_name: string
  company_size: string | null
  industry_vertical: string | null
  annual_revenue_band: string | null
  primary_channel: string | null
  contact_name: string | null
  contact_email: string | null
  consultant_id: string | null
  created_at: string
  completed_at: string | null
}

export interface Response {
  id: string
  session_id: string
  question_id: string
  score: number
  created_at: string
}

export interface Scores {
  id: string
  session_id: string
  pillar_scores: Record<string, number>
  engine_scores: Record<Engine, number>
  overall_score: number
  tiers: Record<string, MaturityTier>
  computed_at: string
}

export interface Note {
  id: string
  session_id: string
  engine: NoteEngine
  body: string
  author_id: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  full_name: string | null
  role: 'consultant' | 'admin'
  created_at: string
}

// Supabase Database type for typed client
export interface Database {
  public: {
    Tables: {
      sessions: {
        Row: Session
        Insert: Omit<Session, 'id' | 'created_at'>
        Update: Partial<Omit<Session, 'id'>>
      }
      responses: {
        Row: Response
        Insert: Omit<Response, 'id' | 'created_at'>
        Update: Partial<Omit<Response, 'id'>>
      }
      scores: {
        Row: Scores
        Insert: Omit<Scores, 'id'>
        Update: Partial<Omit<Scores, 'id'>>
      }
      notes: {
        Row: Note
        Insert: Omit<Note, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Note, 'id'>>
      }
      admin_users: {
        Row: AdminUser
        Insert: Omit<AdminUser, 'created_at'>
        Update: Partial<AdminUser>
      }
    }
  }
}
