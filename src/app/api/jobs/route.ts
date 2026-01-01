import { NextResponse } from "next/server";
import { db } from "../../../lib/supabase"; // ← 中身は pg Pool

export const runtime = "nodejs"; // ★ pg を使うので必須

// GET /api/jobs
export async function GET() {
  try {
    const result = await db.query(
      "SELECT id, title, category, salary, created_at FROM jobs ORDER BY created_at DESC"
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 500 }
    );
  }
}

// POST /api/jobs
export async function POST(req: Request) {
  try {
    const { title, category, salary } = await req.json();

    const result = await db.query(
      "INSERT INTO jobs (title, category, salary) VALUES ($1, $2, $3) RETURNING *",
      [title, category, salary]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 }
    );
  }
}
