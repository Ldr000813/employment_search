// test-connection.js
import { Pool } from "pg";

const pool = new Pool({
  host: "aws-1-ap-northeast-1.pooler.supabase.com", // ← poolerを使う
  port: 6543,                                       // ← 6543
  user: "postgres.ebeqltyaqepgnclumoaa",            // ← これ重要！
  password: "Ldr010924a",          // ← 置き換える
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

const test = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected successfully:", res.rows[0]);
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await pool.end();
  }
};

test();
