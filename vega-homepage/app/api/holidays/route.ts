import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year") ?? String(new Date().getFullYear());

  const apiKey = process.env.HOLIDAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 503 });
  }

  const dates: string[] = [];

  for (let month = 1; month <= 12; month++) {
    const qs = `ServiceKey=${apiKey}&solYear=${year}&solMonth=${String(month).padStart(2, "0")}&numOfRows=50`;
    const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?${qs}`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;

      const xml = await res.text();
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

      for (const item of items) {
        const isHoliday = item.match(/<isHoliday>(.*?)<\/isHoliday>/)?.[1];
        const locdate = item.match(/<locdate>(\d+)<\/locdate>/)?.[1];
        if (isHoliday === "Y" && locdate) {
          dates.push(`${locdate.slice(0, 4)}-${locdate.slice(4, 6)}-${locdate.slice(6, 8)}`);
        }
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json({ dates });
}
