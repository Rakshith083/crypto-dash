import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, TimeScale, Tooltip } from "chart.js"
import { Line } from "react-chartjs-2"
import 'chartjs-adapter-date-fns';
import { useEffect, useState } from "react";
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
)
const API_URL = import.meta.env.VITE_COIN_API_URL;

export default function CoinChart({ coinId }: { coinId: string }) {

    const [chartData, setChartData] = useState<any>({ datasets: [] })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`;
                const resp = await fetch(url)
                if (!resp.ok) throw new Error("Failed to load data")

                const data = await resp.json();
                const prices = (data.prices ?? []).map((p: any) => ({
                    x: new Date(p[0]),
                    y: p[1]
                }))

                setChartData({
                    datasets: [{
                        label: 'Prices (USD)',
                        data: prices,
                        borderWidth: 1,
                        fill: true
                    }]
                });
            } catch (error) {
                console.error(error);
                setChartData({ datasets: [] });
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [coinId])

    if (loading) {
        return <div style={{ marginTop: '30px' }}>Loading chart...</div>
    }

    if (!chartData?.datasets?.length) {
        return <div style={{ marginTop: '30px' }}>No chart data available.</div>
    }

    return <div style={{ marginTop: '30px' }}>
        <Line
            data={chartData}
            options={{
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 7
                        }
                    },
                    y: {
                        ticks: {
                            callback: (value: any) => `$${value.toLocaleString()}`
                        }
                    }
                }
            }}
        ></Line>
    </div>
}