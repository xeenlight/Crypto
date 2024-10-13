import AppLayout from './Components/Layout/AppLayout';
import {CryptoContestProvider} from './Context/crypto-context';


export default function App() {
  return (
    <CryptoContestProvider>
      <AppLayout/>
    </CryptoContestProvider>
  )
}
