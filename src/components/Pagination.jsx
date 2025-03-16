// components/Pagination.jsx
const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>
            Anterior
          </button>
        )}
        
        <span>Página {currentPage} de {totalPages}</span>
        
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)}>
            Próxima
          </button>
        )}
      </div>
    );
  };
  
  export default Pagination;