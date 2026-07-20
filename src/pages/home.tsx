import CoinCards from "../components/CoinCards"
import LimitSelector from "../components/LimitSelector"
import FilterInput from "../components/FilterInput"
import SortSelector from "../components/SortSelector"
import Spinner from "../components/Spinners";

export default function Home(props: any) {

    const {
        coins,
        filter,
        setFilter,
        limit,
        setLimit,
        sortBy,
        setSortBy,
        loading,
        error
    } = props;

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
        {loading && <Spinner></Spinner>}
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