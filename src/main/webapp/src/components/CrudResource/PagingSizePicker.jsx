import React from 'react';

export default function PagingSizePicker({size, onChange}) {
  return <form className="form-inline">
    <label>
      Показывать
      <select className="form-control form-control-sm ml-1 mr-1"
              value={size}
              onChange={e => onChange(e.target.value)}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      записей
    </label>
  </form>
}
