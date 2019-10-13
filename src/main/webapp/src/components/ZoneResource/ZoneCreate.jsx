import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import ZoneForm from "./ZoneForm";

export default function ZoneCreate({isShown, toggle, onSubmit}) {

  const form = React.createRef();

  const handleSubmit = (...args) => {
    form.current.handleSubmit(...args);
  };

  return <>
    <Modal isOpen={isShown} toggle={toggle}>
      <ModalHeader toggle={toggle}>Новая зона</ModalHeader>
      <ModalBody>
        <ZoneForm ref={form} onSubmit={onSubmit}/>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Добавить</Button>
        <Button color="secondary" onClick={toggle}>Отмена</Button>
      </ModalFooter>
    </Modal>
  </>;
}