import React from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import TableHeader from "./TableHeader";
import PagingSizePicker from "./PagingSizePicker";
import ListPaginate from "./ListPaginate";

const axios = require('axios');
const queryString = require('query-string');

class CrudResource extends React.Component {

  state = {
    entities: [],
    totalPages: undefined,
    totalElements: undefined,
    modal: undefined,
    editedEntity: undefined,
  };

  componentDidMount() {
    this.loadEntities();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.loadEntities();
    }
  }

  handleError = err => {
    toast.error(err.toString());
    console.error(err);
  };


  loadEntities() {
    const {apiBase, resName} = this.props;
    const paging = this.pagingFromQuery();
    paging.page -= 1;
    paging.sort += ',' + paging.ord;
    paging.ord = undefined;
    const url = `${apiBase}/${resName}?` + queryString.stringify(paging);

    this.setState({entities: []});
    axios.get(url)
      .then(resp => {
        const {data} = resp;
        this.setState({
          entities: data['_embedded'][resName],
          totalElements: data['page']['totalElements'],
          totalPages: data['page']['totalPages'],
        });
      })
      .catch(err => this.handleError(err));
  }

  createEntity(row) {
    const {apiBase, resName} = this.props;
    const url = `${apiBase}/${resName}`;

    axios.post(url, row)
      .then(() => {
        toast.info("Запись добавлена");
        this.loadEntities();
      })
      .catch(err => this.handleError(err));

    this.setState({modal: undefined, editedEntity: undefined});
  }

  updateEntity(row) {
    const {editedEntity} = this.state;
    const url = editedEntity['_links']['self']['href'];

    axios.put(url, row)
      .then(() => {
        toast.info("Запись сохранена");
        this.loadEntities();
      })
      .catch(err => this.handleError(err));

    this.setState({modal: undefined, editedEntity: undefined});
  }

  deleteEntity() {
    const {editedEntity} = this.state;
    const url = editedEntity['_links']['self']['href'];

    axios.delete(url)
      .then(() => {
        toast.info("Запись удалена");
        this.loadEntities();
      })
      .catch(err => this.handleError(err));

    this.setState({modal: undefined, editedEntity: undefined});
  }

  pagingFromQuery() {
    const qs = queryString.extract(this.props.location.search);
    const qq = queryString.parse(qs);

    return {
      page: (qq.page) ? qq.page : 1,
      size: (qq.size) ? qq.size : 15,
      sort: (qq.sort) ? qq.sort : 'id',
      ord: (qq.ord) ? qq.ord : 'asc',
    };
  }

  handlePagingSizeChange(s) {
    const paging = this.pagingFromQuery();
    paging.page = 1;
    paging.size = s;
    this.props.history.push('?' + queryString.stringify(paging));
  }

  handlePagingPageChange(p) {
    const paging = this.pagingFromQuery();
    paging.page = p + 1;
    this.props.history.push('?' + queryString.stringify(paging));
  }

  handlePagingSortChange(s) {
    const paging = this.pagingFromQuery();
    paging.ord = (paging.sort === s && paging.ord === 'asc') ? 'desc' : 'asc';
    paging.sort = s;
    this.props.history.push('?' + queryString.stringify(paging));
  }

  render() {
    const {names, CreateDialog, UpdateDialog, DeleteDialog} = this.props;
    const {entities, totalPages, totalElements, modal, editedEntity} = this.state;
    const {page, size, sort, ord} = this.pagingFromQuery();
    const iLo = ((page - 1) * size) + 1;
    const iHi = iLo + entities.length - 1;

    return <>
      <div className="row mb-2">
        <div className="col-md-6">
          <button type="button" className="btn btn-sm btn-primary"
                  onClick={() => this.setState({modal: 'create'})}
          >
            <FontAwesomeIcon icon="plus" fixedWidth={true}/>
            {' '}
            Добавить
          </button>
        </div>
        <form className="col-md-6 form-inline">
          {/* TODO: поиск еще надо реализовать */}
          <label className="form-label ml-auto">
            Поиск:
            <input type="search" className="form-control form-control-sm ml-2"/>
          </label>
        </form>
      </div>

      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-light">
        <tr>
          {
            Object.keys(names).map(k =>
              <TableHeader key={k} k={k} name={names[k]} sort={sort} ord={ord}
                           onClick={() => this.handlePagingSortChange(k)}/>
            )
          }
          <th style={{width: '100px'}}/>
        </tr>
        </thead>
        <tbody>
        {
          entities.map(row => (
            <tr key={row['_links'].self.href}>
              {
                Object.keys(names).map(k =>
                  <td key={k}>
                    {row[k]}
                  </td>
                )
              }

              <td className="text-center">
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => this.setState({modal: 'update', editedEntity: row})}
                  >
                    <FontAwesomeIcon icon="edit" fixedWidth={true}/>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => this.setState({modal: 'delete', editedEntity: row})}
                  >
                    <FontAwesomeIcon icon="trash-alt" fixedWidth={true}/>
                  </button>
                </div>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <div className="row">
        <div className="col-md-6 d-flex text-muted">
          <PagingSizePicker lo={iLo} hi={iHi} total={totalElements}
                            size={size} onChange={e => this.handlePagingSizeChange(e)}/>
        </div>
        <div className="col-md-6">
          <ListPaginate
            pageCount={totalPages}
            onPageChange={p => this.handlePagingPageChange(p.selected)}
            hrefBuilder={p => `?page=${p}&size=${size}&sort=${sort}&ord=${ord}`}
            forcePage={page - 1}
          />
        </div>
      </div>

      <CreateDialog
        isShown={modal === 'create'}
        onSubmit={row => this.createEntity(row)}
        toggle={() => this.setState({modal: undefined, editedEntity: undefined})}
      />
      <UpdateDialog
        isShown={modal === 'update'}
        onSubmit={row => this.updateEntity(row)}
        toggle={() => this.setState({modal: undefined, editedEntity: undefined})}
        row={editedEntity}
      />
      <DeleteDialog
        isShown={modal === 'delete'}
        onConfirm={() => this.deleteEntity()}
        toggle={() => this.setState({modal: undefined, editedEntity: undefined})}
        row={editedEntity}
      />
    </>;
  }
}

export default withRouter(CrudResource);
