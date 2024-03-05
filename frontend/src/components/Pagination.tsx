export type PaginationType = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationType) => {
  const paginationNumbers = [];
  for (let i = 1; i <= pages; i++) paginationNumbers.push(i);
  return (
    <div className="flex items-center justify-center ">
      <ul className="flex rounded border border-slate-300 ">
        {paginationNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""}`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
