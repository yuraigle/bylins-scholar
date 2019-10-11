import React from 'react';
import CrudResource from "../CrudResource";

const ZoneList = {
  n: 'ID',
  name: 'Название',
  repop: 'Репоп',
};

const ZoneResource = () => <CrudResource list={ZoneList}/>;

export default ZoneResource;
