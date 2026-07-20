import { MoonLoader } from "react-spinners"
const cssOverride = {
    display:"block",
    margin: "0 auto 50px auto"
}

export default function Spinner(props: any) {
    const { color = "blue", size = 150 } = props
    return (<>
        <div>
            <MoonLoader 
            color={color} 
            size={size} 
            cssOverride={cssOverride}
            aria-label="Loading..."
            ></MoonLoader>
        </div>
    </>)
}