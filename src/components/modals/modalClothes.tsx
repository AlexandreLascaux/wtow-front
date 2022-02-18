import { Modal } from '@mui/material';
import React from 'react';

interface modalClothesInterface{ 
  open: boolean;
  onClose: () => void;
}

export default function ModalClothes({open,onClose}: modalClothesInterface): React.ReactElement {

  return <Modal
    open={open}
    onClose={onClose}
  >
    <>
      <div className="modal-container">
        <div className="child">
          <div className="home-grid-avatar-list d-flex">
            <p>Mettre vêtements ici </p>
          </div>
        </div>
      </div>
    </>
  </Modal>;
}