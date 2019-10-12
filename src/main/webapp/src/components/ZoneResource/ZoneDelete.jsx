import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function ZoneDelete({isShown, toggle, onConfirm, entity}) {
  const id = (entity) ? entity['n'] : null;
  const name = (entity) ? entity['name'] : null;

  return <>
    <Modal isOpen={isShown} toggle={toggle}>
      <ModalHeader toggle={toggle}>Удаление зоны #{id}</ModalHeader>
      <ModalBody>
        Вы уверены, что хотите удалить зону "{name}"?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => onConfirm(entity)}>Удалить</Button>
        <Button color="secondary" onClick={toggle}>Отмена</Button>
      </ModalFooter>
    </Modal>
  </>;
}