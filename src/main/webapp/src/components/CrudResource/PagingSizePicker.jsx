import React from 'react';

export default function PagingSizePicker({lo, hi, total, size, onChange}) {
  return <form className="form-inline" style={{marginBottom: '1rem'}}>
    <span className="mr-1">Показано {lo}-{hi} из {total} записей.</span>
    <label>
      По
      <select className="form-control form-control-sm ml-1 mr-1"
              value={size}
              onChange={e => onChange(e.target.value)}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      на страницу.
    </label>
  </form>
}
