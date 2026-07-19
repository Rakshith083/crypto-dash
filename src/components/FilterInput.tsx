export default function FilterInput(props: any) {
    const { filter, onFilterChange } = props;
    return <>
        <div className="filter">
            <input type="text" value={filter} placeholder="Filter coins by name or symbol" onChange={(element) => { onFilterChange(element.target.value) }} />
        </div>
    </>
}