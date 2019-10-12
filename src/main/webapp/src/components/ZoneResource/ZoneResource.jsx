import React from 'react';
import CrudResource from "../CrudResource";

const ZoneList = {
  n: 'ID',
  name: 'Название',
  repop: 'Репоп',
};

const ZoneResource = () => <CrudResource resName="zones" list={ZoneList}/>;

export default ZoneResource;
