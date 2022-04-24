import { Modal } from '@mui/material';
import React from 'react';
import { AppContext } from '../reducers/context';

interface modalClothesInterface{ 
  open: boolean;
  onClose: () => void;
}

export default function ModalClothes({open,onClose}: modalClothesInterface): React.ReactElement {
  const { state, dispatch } = React.useContext(AppContext);
  
  console.log(state);

  return <Modal
    open={open}
    onClose={onClose}
  >
    <>
      <div className="modal-container">
        <div className="child">
          <div className="home-grid-avatar-list d-flex">
            <div className="clothes">
              <p>Vêtements</p>
              <div>
                <img className="upperbody" src={state.clothe.upperbody[0].url}></img>
              </div>
              <div>
                <img className="upperbody" src={state.clothe.upperbody[1].url}></img>
              </div>
              <div>
                <img className="upperbody" src={state.clothe.lowerbody.url}></img>
              </div>
              <div>
                <img className="upperbody" src={state.clothe.shoes.url}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  </Modal>;
}