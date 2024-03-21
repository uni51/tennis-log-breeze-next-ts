export type Memo = {
  id: number
  user_id: number
  user_name: string
  user_nickname: string
  title: string
  body: string
  category_id: number
  category_name: string
  tag_list: {
    tags: string[]
    // normalized: string[]
  }
  status: number
  is_waiting_for_admin_review: boolean
  created_at: string
  updated_at: string
}
