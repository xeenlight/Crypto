import { createContext, useState, useEffect, useContext } from "react";
import { fetchCryptoData, fetchAssets } from "../Api";
import { percentDifference } from "../Utils";

const CryptoContest = createContext({
  assets: [],
  crepto: [],
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
  
        // Убедитесь, что assetsResponse — это массив
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
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContest.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContest.Provider>
  );
}

export default CryptoContest;

export function useCrypto() {
  return useContext(CryptoContest);
}
