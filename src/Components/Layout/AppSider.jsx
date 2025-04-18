import { Layout, Card, Statistic, List, Typography, Tag, Button } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../Utils";
import { useContext } from "react";
import CryptoContext from "../../Context/crypto-context";

const siderStyle = {
  padding: "1rem",
  overflowY: "auto",
  height: "70vh",
  backgroundColor: "#181A20",
  color: "#181A20",
};

export default function AppSider() {
  const { assets, removeAsset } = useContext(CryptoContext);

  return (
<Layout.Sider width="25%" style={siderStyle}>
  {assets.map((asset) => (
    <Card key={asset.uniqueId} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit,
                withTag: true,
              },
              { title: "Total Amount", value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />

          <Button danger onClick={() => removeAsset(asset.uniqueId)}>
            Delete
          </Button>
        </Card>
      ))}
    </Layout.Sider>
  );
}
