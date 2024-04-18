type Props = {
  totalPages: number,
  limit: number,
  page: number,
  onChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ totalPages, limit, page, onChange }) => {
  const handlePrev = () => {
    if (page > 1) {
      onChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onChange(page + 1);
    }
  };

  return (
    <div className="flex justify-end">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <span onClick={() => handlePrev()} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-md hover:bg-gray-100 hover:text-gray-700 cursor-pointer hover:font-semibold">Previous</span>
          </li>
          {/* Loop through the total pages */}
          {Array.from({ length: totalPages }, (_, i) => (
            <li>
              <span onClick={() => onChange(i + 1)} className={`flex items-center justify-center px-3 h-8 leading-tight border cursor-pointer hover:font-semibold ${page === i + 1 ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-300' : 'bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700 border-gray-300'}`}>{i + 1}</span>
            </li>
          ))}

          <li>
            <span onClick={() => handleNext()} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-md hover:bg-gray-100 hover:text-gray-700 cursor-pointer hover:font-semibold">Next</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;