export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          display_name: string
          slug: string
          bio: string | null
          instagram: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          display_name: string
          slug: string
          bio?: string | null
          instagram?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          display_name?: string
          slug?: string
          bio?: string | null
          instagram?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          user_id: string
          name: string
          venue: string | null
          genre: string | null
          message: string | null
          start_time: string
          end_time: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          venue?: string | null
          genre?: string | null
          message?: string | null
          start_time: string
          end_time: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          venue?: string | null
          genre?: string | null
          message?: string | null
          start_time?: string
          end_time?: string
          is_active?: boolean
          created_at?: string
        }
      }
      qr_codes: {
        Row: {
          id: string
          event_id: string
          slug: string
          label: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          slug: string
          label?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          slug?: string
          label?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      suggestions: {
        Row: {
          id: string
          qr_code_id: string
          event_id: string
          dj_user_id: string
          text: string
          matched_track: Json | null
          status: "pending" | "accepted" | "rejected"
          contact_name: string | null
          contact_instagram: string | null
          contact_phone: string | null
          contact_email: string | null
          tip_amount: number
          tip_pool: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          qr_code_id: string
          event_id: string
          dj_user_id: string
          text: string
          matched_track?: Json | null
          status?: "pending" | "accepted" | "rejected"
          contact_name?: string | null
          contact_instagram?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          tip_amount?: number
          tip_pool?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          qr_code_id?: string
          event_id?: string
          dj_user_id?: string
          text?: string
          matched_track?: Json | null
          status?: "pending" | "accepted" | "rejected"
          contact_name?: string | null
          contact_instagram?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          tip_amount?: number
          tip_pool?: number
          created_at?: string
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          suggestion_id: string
          session_token: string
          amount: number
          mp_payment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          suggestion_id: string
          session_token: string
          amount?: number
          mp_payment_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          suggestion_id?: string
          session_token?: string
          amount?: number
          mp_payment_id?: string | null
          created_at?: string
        }
      }
      vibe_ratings: {
        Row: {
          id: string
          qr_code_id: string
          event_id: string
          dj_user_id: string
          rating: number
          session_token: string | null
          created_at: string
        }
        Insert: {
          id?: string
          qr_code_id: string
          event_id: string
          dj_user_id: string
          rating: number
          session_token?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          qr_code_id?: string
          event_id?: string
          dj_user_id?: string
          rating?: number
          session_token?: string | null
          created_at?: string
        }
      }
      tip_transactions: {
        Row: {
          id: string
          suggestion_id: string | null
          vote_id: string | null
          dj_user_id: string
          mp_payment_id: string
          mp_preference_id: string
          amount: number
          currency: string
          status: "pending" | "approved" | "rejected" | "refunded"
          payer_email: string | null
          refund_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          suggestion_id?: string | null
          vote_id?: string | null
          dj_user_id: string
          mp_payment_id: string
          mp_preference_id: string
          amount: number
          currency?: string
          status?: "pending" | "approved" | "rejected" | "refunded"
          payer_email?: string | null
          refund_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          suggestion_id?: string | null
          vote_id?: string | null
          dj_user_id?: string
          mp_payment_id?: string
          mp_preference_id?: string
          amount?: number
          currency?: string
          status?: "pending" | "approved" | "rejected" | "refunded"
          payer_email?: string | null
          refund_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      mp_credentials: {
        Row: {
          id: string
          user_id: string
          access_token_encrypted: string
          public_key: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          access_token_encrypted: string
          public_key: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          access_token_encrypted?: string
          public_key?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      public_suggestions: {
        Row: {
          id: string
          qr_code_id: string
          event_id: string
          text: string
          matched_track: Json | null
          status: string
          tip_pool: number
          created_at: string
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type Insertable<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]

export type MatchedTrack = {
  title: string
  artist: string
  album?: string
  image_url?: string
  source: "spotify" | "lastfm"
}
