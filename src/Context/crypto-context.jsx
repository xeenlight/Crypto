import { createContext, useState, useEffect, useContext } from "react";
import { fetchCryptoData, fetchAssets } from "../Api";
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

  useEffect(() => {
    async function preload() {
      setLoading(true);
      try {
        const data = await fetchCryptoData();
        const assetsResponse = await fetchAssets();

        const assets = Array.isArray(assetsResponse) ? assetsResponse : assetsResponse.assets || [];

        setAssets(mapAssets(assets, data.result));
        setCrypto(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    const updatedAsset = {
      ...newAsset,
      uniqueId: Date.now() + Math.random(), // добавляем уникальный идентификатор
    };
    const updatedAssets = [...assets, updatedAsset];
    setAssets(mapAssets(updatedAssets, crypto));
    localStorage.setItem("userAssets", JSON.stringify(updatedAssets));
  }
  

  function removeAsset(uniqueId) {
    const updatedAssets = assets.filter(asset => asset.uniqueId !== uniqueId);
    setAssets(mapAssets(updatedAssets, crypto));
    localStorage.setItem("userAssets", JSON.stringify(updatedAssets));
  }
  

  return (
    <CryptoContest.Provider value={{ loading, crypto, assets, addAsset, removeAsset }}> {/* Добавил removeAsset */}
      {children}
    </CryptoContest.Provider>
  );
}

export default CryptoContest;

export function useCrypto() {
  return useContext(CryptoContest);
}
