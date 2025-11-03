import { createClient } from "@/app/global/util/supabase/client";
import { notFound } from "next/navigation";

export default async function Home({ params, }: { params: Promise<{ id: string }> }){

    const volunteerId = (await params).id;
    const supabase = createClient();

    const { data: volunteerData, error } = await supabase.from('Volunteer').select('*').eq('id', volunteerId).single();
    if (error) {
    console.error('Supabase error:', error);
    notFound(); // Shows 404 page
  }

  if (!volunteerData) {
    console.log('No volunteer found with id:', volunteerId);
    notFound();
  }

    return(<>
    <h2>{volunteerData.phone}</h2>
    </>);
}