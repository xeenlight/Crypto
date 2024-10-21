const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'JtQzsBfvMl2hjCmaVcfmndg4G6FnRkF0wWHQ5I1JQx0=',
    'Cache-Control': 'no-cache'
  }
};

export async function fetchCryptoData() {
  const response = await fetch('https://openapiv1.coinstats.app/coins', options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function fetchAssets() {
  const response = await fetch('https://openapiv1.coinstats.app/coins', options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}
