import { Table } from 'antd';
import { useCrypto } from "../../Context/crypto-context";

const tableStyle = {

  textAlign: "center",
  color: "#fff",
  backgroundColor: "#181A20",
  padding: "1rem",
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'], 
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.time - b.time,
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
    time: a.time,
  }));

  return <Table style={tableStyle} pagination={false} columns={columns} dataSource={data} />;
}
