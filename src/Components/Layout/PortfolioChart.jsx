import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useCrypto } from "../../Context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useCrypto();
  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: "$",
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 99, 0.3)",
          "rgba(232, 235, 54, 0.3)",
          "rgba(60, 235, 54, 0.3)",
          "rgba(54, 154, 235, 0.3)",
          "rgba(54, 81, 235, 0.3)",
          "rgba(178, 54, 235, 0.3)",
          "rgba(235, 54, 181, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 99, 1)",
          "rgba(232, 235, 54, 1)",
          "rgba(60, 235, 54, 1)",
          "rgba(54, 154, 235, 1)",
          "rgba(54, 81, 235, 1)",
          "rgba(178, 54, 235, 1)",
          "rgba(235, 54, 181, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '60%', 
    plugins: {
      legend: {
        position: 'top',
      },
    },
    
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: "85%",
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
}
