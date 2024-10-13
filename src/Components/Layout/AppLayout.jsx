import { Layout, Spin } from 'antd';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';
import { useContext } from 'react';
import CryptoContest from '../../Context/crypto-context';
export default function AppLayout() {
    const {loading} = useContext(CryptoContest)

    if (loading) {
        return <Spin fullscreen />;
    }

    return (
        <Layout>
        <AppHeader/>
        <Layout>
          <AppSider/>
          <AppContent/>
        </Layout>
      </Layout>
    )
}