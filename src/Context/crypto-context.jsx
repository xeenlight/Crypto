import { createContext, useState, useEffect, useContext } from "react";
import { fetchCryptoData, fetchAssets } from "../Api"; // Убедись, что пути правильные
import { percentDifference } from "../Utils";

const CryptoContest = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContestProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  // Функция для отображения активов
  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  // Загрузка данных
  async function preload() {
    console.log("Loading data..."); // Отладка
    setLoading(true);
    try {
      const data = await fetchCryptoData();
      const assetsResponse = await fetchAssets();

      console.log("Data loaded:", data, assetsResponse); // Отладка

      const storedAssets = JSON.parse(localStorage.getItem("userAssets")) || [];
      setAssets(mapAssets(storedAssets, data.result));
      setCrypto(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Первоначальная загрузка данных
  useEffect(() => {
    preload();
  }, []);

  // Добавление нового актива
  function addAsset(newAsset) {
    const updatedAsset = {
      ...newAsset,
      uniqueId: Date.now() + Math.random(), // добавляем уникальный идентификатор
    };
    const updatedAssets = [...assets, updatedAsset];
    const mappedAssets = mapAssets(updatedAssets, crypto);
    setAssets(mappedAssets);
    localStorage.setItem("userAssets", JSON.stringify(updatedAssets));
  }

  // Удаление актива
  function removeAsset(uniqueId) {
    const updatedAssets = assets.filter(asset => asset.uniqueId !== uniqueId);
    const mappedAssets = mapAssets(updatedAssets, crypto);
    setAssets(mappedAssets);
    localStorage.setItem("userAssets", JSON.stringify(updatedAssets));
  }

  return (
    <CryptoContest.Provider value={{ loading, crypto, assets, addAsset, removeAsset, preload  }}>
      {children}

    </CryptoContest.Provider>
  );
}

export default CryptoContest;

export function useCrypto() {
  return useContext(CryptoContest);
}
