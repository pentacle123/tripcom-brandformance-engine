import { readFileSync } from "fs";
import { join } from "path";

function getApiKey() {
  if (process.env.ANTHROPIC_API_KEY) {
    return process.env.ANTHROPIC_API_KEY;
  }
  try {
    const envPath = join(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf-8");
    const match = content.match(/ANTHROPIC_API_KEY=(.+)/);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

async function callClaude(apiKey, system, messages, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system,
          messages,
        }),
      });

      const data = await response.json();

      // Overloaded or rate limited — retry
      if (response.status === 529 || response.status === 429) {
        const wait = attempt * 2000; // 2s, 4s, 6s
        console.log(`Claude API ${response.status}, retry ${attempt}/${retries} after ${wait}ms`);
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, wait));
          continue;
        }
        return { error: `API 과부하 (${retries}회 재시도 후 실패). 잠시 후 다시 시도해주세요.`, status: response.status };
      }

      if (!response.ok) {
        return { error: data.error?.message || `API 오류 (${response.status})`, status: response.status, data };
      }

      return { data, status: response.status };
    } catch (e) {
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, attempt * 2000));
        continue;
      }
      return { error: e.message, status: 500 };
    }
  }
}

export async function POST(request) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return Response.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  const { system, messages } = await request.json();

  const result = await callClaude(apiKey, system, messages);

  if (result.error) {
    return Response.json(
      { error: { message: result.error } },
      { status: result.status || 500 }
    );
  }

  return Response.json(result.data);
}
