
// import {supabaseServerClient } from '@/api/config';
// import { cookies } from 'next/headers';

// export default async function LoginPage() {    
//     // const { data: users } = await supabaseClient.from('users').select('*')
//     // console.log(users)

//     // let { data: users, error } = await supabaseClient
//     // .from('users')
//     // .select('*')
//     const cookieStore = cookies()
//     const supabase = supabaseServerClient(await cookieStore)
//     const { data: users, error } = await supabase.from('users').select('*')


//   console.log(users);
    
//   return (
//     <>
//     <div>page</div>
//     <button >sign  out</button>
//     </>
//   )
// }
