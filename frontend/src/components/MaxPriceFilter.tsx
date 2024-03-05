type Props = {
  selectedMaxPrice?: number;
  onChange: (value?: number) => void;
};

const MaxPriceFilter = ({ selectedMaxPrice, onChange }: Props) => {
  return (
    <div className=" mb-3">
      <h4 className="text-md font-semibold mb-3">Max Price</h4>
      <select
        value={selectedMaxPrice}
        className="border border-slate-300 py-1 px-2 rounded w-full"
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option>Select Max Price</option>
        <option value={1000}>1000</option>
        <option value={2000}>2000</option>
        <option value={3000}>3000</option>
      </select>
    </div>
  );
};
export default MaxPriceFilter;
