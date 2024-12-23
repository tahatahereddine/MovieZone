import ReactPaginate from "react-paginate";
import "./Pagination.css";
import "./bootstrap.css";

function Pagination(props) {
    return (
        <div className="pagination-container">
            <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={props.handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
        />
      </div>
    );
}

export default Pagination;