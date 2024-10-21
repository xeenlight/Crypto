import { Table } from 'antd';
import { useCrypto } from "../../Context/crypto-context";
import moment from 'moment';

const tableStyle = {
  textAlign: "center",
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
    sorter: (a, b) => new Date(a.time) - new Date(b.time),
    render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"), 
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((a, index) => ({
    key: `${a.id}-${index}`,  // Добавляем индекс для уникальности ключа
    name: a.name,
    price: a.price,
    amount: a.amount,
    time: a.date, 
  }));

  return <Table style={tableStyle} pagination={false} columns={columns} dataSource={data} />;
}
