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
            gallery: {
                Row: {
                    caption: string | null
                    created_at: string
                    id: string
                    image_url: string
                }
                Insert: {
                    caption?: string | null
                    created_at?: string
                    id?: string
                    image_url: string
                }
                Update: {
                    caption?: string | null
                    created_at?: string
                    id?: string
                    image_url?: string
                }
                Relationships: []
            }
            stalls: {
                Row: {
                    category: string
                    class_grade: string | null
                    created_at: string
                    description: string | null
                    id: string
                    image_url: string | null
                    location: string | null
                    name: string
                    students: string | null
                }
                Insert: {
                    category: string
                    class_grade?: string | null
                    created_at?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    location?: string | null
                    name: string
                    students?: string | null
                }
                Update: {
                    category?: string
                    class_grade?: string | null
                    created_at?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    location?: string | null
                    name?: string
                    students?: string | null
                }
                Relationships: []
            }
            votes: {
                Row: {
                    category: string
                    created_at: string
                    id: string
                    stall_id: string
                    user_email: string
                }
                Insert: {
                    category: string
                    created_at?: string
                    id?: string
                    stall_id: string
                    user_email: string
                }
                Update: {
                    category?: string
                    created_at?: string
                    id?: string
                    stall_id?: string
                    user_email?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "votes_stall_id_fkey"
                        columns: ["stall_id"]
                        isOneToOne: false
                        referencedRelation: "stalls"
                        referencedColumns: ["id"]
                    }
                ]
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
