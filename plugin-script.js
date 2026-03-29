const BASE_URL = "https://api-aniwatch.onrender.com";

async function search(query) {
  const res = await fetch(`${BASE_URL}/anime/search?q=${encodeURIComponent(query)}&page=1`);
  const data = await res.json();
  return (data.animes || []).map((item) => ({
    id: item.id,
    title: item.name,
    image: item.poster,
  }));
}

async function fetchInfo(id) {
  const res = await fetch(`${BASE_URL}/anime/info?id=${encodeURIComponent(id)}`);
  const data = await res.json();
  const info = data.anime?.info || {};
  return {
    id: info.id,
    title: info.name,
    image: info.poster,
    description: info.description,
  };
}

async function fetchEpisodes(id) {
  const res = await fetch(`${BASE_URL}/anime/episodes/${encodeURIComponent(id)}`);
  const data = await res.json();
  return (data.episodes || []).map((ep) => ({
    id: ep.episodeId,
    number: ep.number,
    title: ep.title,
  }));
}

async function fetchSources(id) {
  const res = await fetch(`${BASE_URL}/anime/episode-srcs?id=${encodeURIComponent(id)}&server=vidstreaming&category=sub`);
  const data = await res.json();
  return (data.sources || []).map((source) => ({
    url: source.url,
    quality: source.quality,
    isM3U8: source.isM3U8,
  }));
}

return {
  search,
  fetchInfo,
  fetchEpisodes,
  fetchSources,
};
