import React from 'react';
import ReactPaginate from 'react-paginate';

const axios = require('axios');
const queryString = require('query-string');

export default class CrudResource extends React.Component {

  state = {
    entities: [],
    totalPages: undefined,
    totalElements: undefined,
    page: undefined,
  };


  componentDidMount() {
    const apiBase = 'http://localhost:8080/api';
    const resourceName = 'zones';

    const params = {page: 1, size: 10, sort: 'id,desc'};
    const url = `${apiBase}/${resourceName}?` + queryString.stringify(params);

    this.setState({entities: []});
    axios.get(url)
      .then((resp) => {
        const {data} = resp;
        this.setState({
          entities: data['_embedded'][resourceName],
          totalElements: data['page']['totalElements'],
          totalPages: data['page']['totalPages'],
          page: data['page']['number'],
        });
        // console.log(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("done")
      });
  }

  render() {
    const {list} = this.props;
    const {entities, page, totalPages} = this.state;

    return <>
      <table className="table table-sm table-hover">
        <thead className="thead-light">
        <tr>
          { // TODO: сортировка
            Object.keys(list).map(k => <th key={k}>{list[k]}</th>)
          }
          <th/>
        </tr>
        </thead>
        <tbody>
        {

          entities.map(row => (
            <tr key={row['_links'].self.href}>
              {
                Object.keys(list).map(k => <td key={k}>{row[k]}</td>)
              }
              <td/>
            </tr>
          ))
        }
        </tbody>
      </table>

      <ReactPaginate
        pageCount={totalPages}
        // onPageChange={() => {}}
        hrefBuilder={p => `?page=${p}`}
        forcePage={page - 1}
        containerClassName="pagination"
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
    </>;
  }
}
