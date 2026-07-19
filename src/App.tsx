import { useEffect, useState } from "react"
import CoinCards from "./components/CoinCards"
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page1&sparkline=false'

export default function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const url = `${API_URL}&order=market_cap_desc&per_page=10&page1&sparkline=false`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Failed to fetch data")
        const data = await resp.json();
        console.log(data)
        setCoins(data)
      }
      catch (err: any) {
        setError(err.message)
      }
      finally {
        setLoading(false);
      }
    }
    fetchCoins()
  }, []);



  return <div>
    <h1>Crypto Dash</h1>
    {loading && <p>Loading...</p>}
    {error && <div className="error"> {error}</div>}


    {(!loading && !error) && (
      <main className="grid">
        {
          coins.map((coin: any) => (
            <CoinCards coin={coin}> </CoinCards>
          ))
        }
      </main>
    )}
  </div>
}