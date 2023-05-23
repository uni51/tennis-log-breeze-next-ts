export type Memo = {
  memo: {
    id: number
    user_id: number
    title: string
    body: string
    category_id: number
    category_name: string
    // tag_list: ['tags', 'normalized']
    created_at: string
    updated_at: string
  }
}
