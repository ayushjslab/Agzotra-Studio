import { createSupabaseServerClient } from '@/lib/supabase/server';
import React from 'react'

const HomePage = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  return (
    <div>HomePage</div>
  )
}

export default HomePage