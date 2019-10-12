import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function TableHeader({k, name, sort, ord, onClick}) {
  let icon = null;
  if (sort === k && ord === 'asc')
    icon = <FontAwesomeIcon className="ml-auto" icon="sort-up"/>;
  if (sort === k && ord === 'desc')
    icon = <FontAwesomeIcon icon="sort-down"/>;

  return <th key={k} onClick={onClick} style={{cursor: 'pointer'}}>
    <div className="d-flex">
      <span className="mr-auto">{name}</span>
      <span>{icon}</span>
    </div>
  </th>
}