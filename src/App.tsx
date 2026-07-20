import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/home"
import AboutPage from "./pages/about"
import Header from "./components/headers"
import CoinDetails from "./pages/coin-details"

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



  return <div>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home
          coins={coins}
          filter={filter}
          setFilter={setFilter}
          limit={limit}
          setLimit={setLimit}
          sortBy={sortBy}
          setSortBy={setSortBy}
          loading={loading}
          error={error}
        ></Home>}>
        </Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route path="/coin/:id" element={<CoinDetails />}></Route>
        <Route path="*" element={<h2>Not found</h2>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}