export async function httpGet(url) {
  const response = await fetch(url, { method: 'GET' });
  return response.json();
}
