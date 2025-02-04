import { supabaseServerClient } from '@/api/config'
import Dashboard from '@/components/Dashboard.jsx'
import { cookies } from 'next/headers'


const dashboard = async () => {
    const cookieStore = cookies()
    const supabase = supabaseServerClient(await cookieStore)
    const { data: users, error } = await supabase.from('users').select('*')
  

  return (
  <div className="w-full h-screen">
    <Dashboard user={users} error={error}/>
  </div>
  )
}

export default dashboard