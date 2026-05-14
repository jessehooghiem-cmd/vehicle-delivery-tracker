import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hyevocpdumanwxxccted.supabase.co'
const supabaseKey = 'sb_publishable_80xOUpLADR6xyArFhD6VkA_6CVBO8aJ'

export const supabase = createClient(supabaseUrl, supabaseKey)