import React from 'react';
import ReactPaginate from "react-paginate";

export default function ListPaginate({pageCount, onPageChange, hrefBuilder, forcePage}) {
  return <ReactPaginate
    pageCount={pageCount}
    onPageChange={onPageChange}
    hrefBuilder={hrefBuilder}
    forcePage={forcePage}
    containerClassName="pagination justify-content-end"
    previousLabel={"←"}
    nextLabel={"→"}
    breakClassName="page-item disabled"
    breakLinkClassName="page-link"
    pageClassName="page-item"
    previousClassName="page-item"
    nextClassName="page-item"
    pageLinkClassName="page-link"
    previousLinkClassName="page-link"
    nextLinkClassName="page-link"
    disabledClassName="disabled"
    activeClassName="active"
  />
}
