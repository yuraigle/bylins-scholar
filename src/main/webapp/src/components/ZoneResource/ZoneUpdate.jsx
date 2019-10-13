import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import ZoneForm from "./ZoneForm";

export default function ZoneUpdate({isShown, toggle, onSubmit, row}) {

  const form = React.createRef();

  const handleSubmit = (...args) => {
    form.current.handleSubmit(...args);
  };

  const n = (row) ? row['n'] : null;

  return <>
    <Modal isOpen={isShown} toggle={toggle}>
      <ModalHeader toggle={toggle}>Редактирование зоны #{n}</ModalHeader>
      <ModalBody>
        <ZoneForm ref={form} row={row} onSubmit={onSubmit}/>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Сохранить</Button>
        <Button color="secondary" onClick={toggle}>Отмена</Button>
      </ModalFooter>
    </Modal>
  </>;
}