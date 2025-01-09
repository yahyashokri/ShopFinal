export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      card: {
        Row: {
          added_at: string
          category: string
          description: string
          id: string
          imageurl: string
          pid: number | null
          price: number
          quantity: number
          rating: number
          size: string | null
          title: string
          uid: string | null
        }
        Insert: {
          added_at?: string
          category?: string
          description: string
          id?: string
          imageurl: string
          pid?: number | null
          price: number
          quantity?: number
          rating: number
          size?: string | null
          title: string
          uid?: string | null
        }
        Update: {
          added_at?: string
          category?: string
          description?: string
          id?: string
          imageurl?: string
          pid?: number | null
          price?: number
          quantity?: number
          rating?: number
          size?: string | null
          title?: string
          uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_pid_fkey"
            columns: ["pid"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Favorite: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: number
          imageurl: string | null
          pid: string | null
          price: string | null
          rating: string | null
          title: string | null
          uid: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          imageurl?: string | null
          pid?: string | null
          price?: string | null
          rating?: string | null
          title?: string | null
          uid?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          imageurl?: string | null
          pid?: string | null
          price?: string | null
          rating?: string | null
          title?: string | null
          uid?: string | null
        }
        Relationships: []
      }
      portals: {
        Row: {
          addCardPortal: boolean | null
          cardPortal: boolean
          id: number
        }
        Insert: {
          addCardPortal?: boolean | null
          cardPortal?: boolean
          id?: number
        }
        Update: {
          addCardPortal?: boolean | null
          cardPortal?: boolean
          id?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          description: string
          id: number
          imageurl: string
          price: number
          rating: number
          stock: number
          title: string
        }
        Insert: {
          category?: string | null
          description: string
          id?: number
          imageurl: string
          price: number
          rating: number
          stock?: number
          title: string
        }
        Update: {
          category?: string | null
          description?: string
          id?: number
          imageurl?: string
          price?: number
          rating?: number
          stock?: number
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          Address: string | null
          created_at: string
          email: string
          "full-name": string | null
          id: string
          phone: string | null
          role: string | null
        }
        Insert: {
          Address?: string | null
          created_at?: string
          email: string
          "full-name"?: string | null
          id: string
          phone?: string | null
          role?: string | null
        }
        Update: {
          Address?: string | null
          created_at?: string
          email?: string
          "full-name"?: string | null
          id?: string
          phone?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
