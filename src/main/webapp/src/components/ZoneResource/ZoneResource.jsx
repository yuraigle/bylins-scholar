import React from 'react';
import CrudResource from "../CrudResource";
import ZoneCreate from "./ZoneCreate";
import ZoneDelete from "./ZoneDelete";

const names = {
  n: '№',
  name: 'Название',
  repop: 'Репоп',
};

const ZoneResource = () =>
  <CrudResource
    apiBase="http://localhost:8080/api"
    resName="zones"
    names={names}
    CreateDialog={ZoneCreate}
    DeleteDialog={ZoneDelete}
  />;

export default ZoneResource;
