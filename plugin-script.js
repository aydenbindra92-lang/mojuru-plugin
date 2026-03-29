const BASE_URL = "https://api.consumet.org/anime/gogoanime";

async function search(query) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.results.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    url: item.url,
  }));
}

async function fetchInfo(id) {
  const res = await fetch(`${BASE_URL}/info/${encodeURIComponent(id)}`);
  const data = await res.json();
  return {
    id: data.id,
    title: data.title,
    image: data.image,
    description: data.description,
    episodes: data.episodes,
  };
}

async function fetchEpisodes(id) {
  const info = await fetchInfo(id);
  return info.episodes.map((ep) => ({
    id: ep.id,
    number: ep.number,
    url: ep.url,
  }));
}

async function fetchSources(id) {
  const res = await fetch(`${BASE_URL}/watch/${encodeURIComponent(id)}`);
  const data = await res.json();
  return data.sources.map((source) => ({
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
