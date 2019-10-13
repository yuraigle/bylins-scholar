import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function ZoneDelete({isShown, toggle, onConfirm, row}) {
  const n = (row) ? row['n'] : null;
  const name = (row) ? row['name'] : null;

  return <>
    <Modal isOpen={isShown} toggle={toggle}>
      <ModalHeader toggle={toggle}>Удаление зоны #{n}</ModalHeader>
      <ModalBody>
        Вы уверены, что хотите удалить зону "{name}"?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => onConfirm(row)}>Удалить</Button>
        <Button color="secondary" onClick={toggle}>Отмена</Button>
      </ModalFooter>
    </Modal>
  </>;
}