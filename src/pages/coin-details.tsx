import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import Spinner from "../components/Spinners";
import CoinChart from "../components/CoinChar";
const API_URL = import.meta.env.VITE_COIN_API_URL


export default function CoinDetails() {
    const { id } = useParams();
    const [coin, setCoin] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const url = `${API_URL}/${id}`
        const fetchCoin = async () => {
            try {
                const resp = await fetch(url);
                if (!resp.ok) {
                    throw new Error('Failed to fetch Coin data')
                }
                const data = await resp.json();
                setCoin(data);
                setError(null)
            }
            catch (err: any) {
                setError(err.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchCoin();
    }, [id])
    return <div className="coin-details-container">

        <h2>Coin details{id}</h2>
        <Link to={'/'}>Back to Home</Link>
        <h1 className="coin-details-title">
            {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
        </h1>
        {loading && <Spinner></Spinner>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && (
            <>
                <img src={coin.image.large} alt={coin.name} className="coin" />
                <p>{coin.description.en.split('. ')[0]}.</p>
                <div className="coin-details-info">
                    <h3>Rank: #{coin.market_cap_rank}</h3>
                    <h3>Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</h3>
                    <h4>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                    <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
                    <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
                    <h4>Price Change: ${coin.market_data.price_change_24h.toFixed(2)} ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)</h4>
                    <h4>Total Supply: {coin.market_data.total_supply.toLocaleString()}</h4>
                    <h4>All Time High: ${coin.market_data.ath.usd.toLocaleString()} on {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}</h4>
                    <h4>All Time Low: ${coin.market_data.atl.usd.toLocaleString()} on {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}</h4>
                    <h4>Last Updated: {new Date(coin.last_updated).toLocaleDateString()}</h4>
                </div>
                <CoinChart coinId={coin.id}></CoinChart>
                <div className="coin-details-links">
                    {
                        coin.links.homepage[0] && (
                            <p>🌐
                                <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">Website</a>
                            </p>
                        )
                    }
                    {
                        coin.links.blockchain_site[0] && (
                            <p>⛓️‍💥
                                <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">Blockchain explorer</a>
                            </p>
                        )
                    }
                    {
                        coin.categories && coin.categories.length && (
                            <p>Categories: {coin.categories.join("|")}</p>
                        )
                    }
                    {!loading && !error && !coin && (<p>No Data Found</p>)}
                </div>
            </>
        )

        }
    </div>
}