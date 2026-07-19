import { useEffect, useState } from "react"
import CoinCards from "./components/CoinCards"
import LimitSelector from "./components/LimitSelector"
import FilterInput from "./components/FilterInput"
import SortSelector from "./components/SortSelector"
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page1&sparkline=false'

export default function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_desc')

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const url = `${API_URL}&order=market_cap_desc&per_page=${limit}&page1&sparkline=false`;
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
  }, [limit, sortBy]);

  const filteredCoins = coins.filter((coins: any) => {
    return (coins.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
      coins.symbol.toLowerCase().includes(filter.toLocaleLowerCase()))
  })
    .slice()
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case 'market_cap_desc': return b.market_cap - a.market_cap
        case 'market_cap_asc': return a.market_cap - b.market_cap
        case 'price_desc': return b.current_price - a.current_price
        case 'price_asc': return a.current_price - b.current_price
        case 'change_desc': return b.price_change_percentage_24h - a.price_change_percentage_24h
        case 'change_asc': return a.price_change_percentage_24h - b.price_change_percentage_24h
        default: return 0
      }
    })

  return <div>
    <h1>Crypto Dash</h1>
    {loading && <p>Loading...</p>}
    {error && <div className="error"> {error}</div>}
    <div className="top-controls">
      <FilterInput filter={filter} onFilterChange={setFilter}></FilterInput>
      <LimitSelector limit={limit} onChange={setLimit}></LimitSelector>
      <SortSelector sortBy={sortBy} onSortChange={setSortBy}></SortSelector>
    </div>
    {(!loading && !error) && (
      <main className="grid">
        {
          filteredCoins.length === 0 && <p>No Matches</p>
        }

        {
          filteredCoins.map((coin: any) => (
            <CoinCards key={coin.id} coin={coin} />
          ))
        }
      </main>
    )}
  </div>
}