import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";

// GET /api/jobs
export async function GET() {
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, category, salary, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// POST /api/jobs
export async function POST(req: Request) {
  const { title, category, salary } = await req.json();

  const { data, error } = await supabase
    .from("jobs")
    .insert([{ title, category, salary }])
    .select()
    .single();

  if (error) {
    console.error("Supabase POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
