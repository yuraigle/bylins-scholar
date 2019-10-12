import React from 'react';
import {withRouter} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const axios = require('axios');
const queryString = require('query-string');

class CrudResource extends React.Component {

  state = {
    entities: [],
    totalPages: undefined,
    totalElements: undefined,
    currPage: undefined,
  };

  componentDidMount() {
    this.loadEntities();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.loadEntities();
    }
  }

  loadEntities() {
    const apiBase = 'http://localhost:8080/api';
    const {resName} = this.props;

    const qs = queryString.extract(this.props.location.search);
    const qq = queryString.parse(qs);
    const pagination = {
      page: (qq.page) ? qq.page - 1 : undefined,
      size: 10,
      sort: 'id,desc',
    };

    const url = `${apiBase}/${resName}?` + queryString.stringify(pagination);

    this.setState({entities: []});
    axios.get(url)
      .then((resp) => {
        const {data} = resp;
        this.setState({
          entities: data['_embedded'][resName],
          totalElements: data['page']['totalElements'],
          totalPages: data['page']['totalPages'],
          currPage: data['page']['number'],
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("done")
      });
  }

  handlePageClick(p) {
    this.props.history.push(`?page=${p + 1}`)
  }

  render() {
    const {list, resName} = this.props;
    const {entities, totalPages, currPage} = this.state;

    return <>
      <table className="table table-sm table-hover">
        <thead className="thead-light">
        <tr>
          { // TODO: тут сортировка
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
                // TODO: тут форматирование дат итд
                Object.keys(list).map(k => <td key={k}>{row[k]}</td>)
              }

              <td className="text-right">
                <a className="btn btn-sm btn-primary mr-1" href={`/${resName}/edit/${row.n}`}>
                  <FontAwesomeIcon icon="edit"/>
                </a>
                <a className="btn btn-sm btn-danger" href={`/${resName}/delete/${row.n}`}>
                  <FontAwesomeIcon icon="trash-alt"/>
                </a>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <ReactPaginate
        pageCount={totalPages}
        onPageChange={p => this.handlePageClick(p.selected)}
        hrefBuilder={() => ''}
        forcePage={currPage}
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

export default withRouter(CrudResource);
