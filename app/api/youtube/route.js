import { readFileSync } from "fs";
import { join } from "path";

function getApiKey() {
  if (process.env.YOUTUBE_API_KEY) return process.env.YOUTUBE_API_KEY;
  try {
    const content = readFileSync(join(process.cwd(), ".env.local"), "utf-8");
    const match = content.match(/YOUTUBE_API_KEY=(.+)/);
    return match ? match[1].trim() : null;
  } catch { return null; }
}

const BASE = "https://www.googleapis.com/youtube/v3";

export async function GET(request) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return Response.json({ items: [], error: "YOUTUBE_API_KEY not configured" });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "search";
  const q = searchParams.get("q") || "";
  const channelId = searchParams.get("channelId") || "";
  const videoId = searchParams.get("videoId") || "";
  const maxResults = searchParams.get("maxResults") || "6";

  try {
    let url;

    switch (type) {
      case "search":
        url = `${BASE}/search?part=snippet&q=${encodeURIComponent(q)}&type=video&videoDuration=short&order=viewCount&maxResults=${maxResults}&publishedAfter=${new Date(Date.now() - 90 * 86400000).toISOString()}&key=${apiKey}`;
        break;

      case "channel":
        url = `${BASE}/search?part=snippet&q=${encodeURIComponent(q)}&type=channel&order=relevance&maxResults=${maxResults}&key=${apiKey}`;
        break;

      case "video":
        url = `${BASE}/videos?part=snippet,statistics&id=${encodeURIComponent(videoId)}&key=${apiKey}`;
        break;

      case "channelStats":
        url = `${BASE}/channels?part=snippet,statistics&id=${encodeURIComponent(channelId)}&key=${apiKey}`;
        break;

      default:
        return Response.json({ items: [], error: "Invalid type" });
    }

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return Response.json({ items: [], error: data.error?.message || "YouTube API error" });
    }

    // search 타입일 때 조회수 포함을 위해 video details 추가 조회
    if (type === "search" && data.items?.length > 0) {
      const videoIds = data.items.map(item => item.id?.videoId).filter(Boolean).join(",");
      if (videoIds) {
        const statsRes = await fetch(`${BASE}/videos?part=statistics&id=${videoIds}&key=${apiKey}`);
        const statsData = await statsRes.json();
        const statsMap = {};
        (statsData.items || []).forEach(v => { statsMap[v.id] = v.statistics; });
        data.items = data.items.map(item => ({
          ...item,
          statistics: statsMap[item.id?.videoId] || {},
        }));
      }
    }

    // channel 타입일 때 구독자수 포함을 위해 channel details 추가 조회
    if (type === "channel" && data.items?.length > 0) {
      const channelIds = data.items.map(item => item.id?.channelId || item.snippet?.channelId).filter(Boolean).join(",");
      if (channelIds) {
        const statsRes = await fetch(`${BASE}/channels?part=statistics&id=${channelIds}&key=${apiKey}`);
        const statsData = await statsRes.json();
        const statsMap = {};
        (statsData.items || []).forEach(ch => { statsMap[ch.id] = ch.statistics; });
        data.items = data.items.map(item => ({
          ...item,
          statistics: statsMap[item.id?.channelId || item.snippet?.channelId] || {},
        }));
      }
    }

    return Response.json(data);
  } catch (e) {
    return Response.json({ items: [], error: e.message });
  }
}
