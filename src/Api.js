const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'JtQzsBfvMl2hjCmaVcfmndg4G6FnRkF0wWHQ5I1JQx0='
    }
  };
  
  export function fetchCryptoData() {
    return fetch('https://openapiv1.coinstats.app/coins', options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }
  
  export function fetchAssets() {
    // Здесь можно подключить ваш API для получения активов пользователя
    // Например, если у вас есть другой API для получения активов:
    return fetch('https://openapiv1.coinstats.app/coins', options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }
  