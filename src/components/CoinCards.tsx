import { Link } from "react-router";

export default function CoinCards(props: any) {
    const { coin } = props;
    return (
        <Link to={`/coin/${coin.id}`}>
            <div className="coin-card" key={coin.id}>
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div>
                    <h2>{coin.name}</h2>
                    <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
                <p>Price:${coin.current_price.toLocaleString()}</p>
                <p className={coin.price_change_24h >= 0 ? "possitive" : "negative"}>{coin.price_change_24h ? coin.price_change_24h.toFixed(2) : 0}%</p>
                <p>
                    Market Cap: {coin.market_cap.toLocaleString()}
                </p>

            </div>
        </Link>
    )
}