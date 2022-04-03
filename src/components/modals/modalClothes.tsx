import { Modal } from '@mui/material';
import React from 'react';
import { AppContext } from '../reducers/context';

interface modalClothesInterface{ 
  open: boolean;
  onClose: () => void;
}

export default function ModalClothes({open,onClose}: modalClothesInterface): React.ReactElement {
  const { state, dispatch } = React.useContext(AppContext);
  
  console.log();

  return <Modal
    open={open}
    onClose={onClose}
  >
    <>
      <div className="modal-container">
        <div className="child">
          <div className="home-grid-avatar-list d-flex">
            <p>Mettre vêtements ici</p>
            <img src={state.clothe.hat.type} alt="hat"></img>
          </div>
        </div>
      </div>
    </>
  </Modal>;
}