import { Modal,Grid } from '@mui/material';
import React from 'react';
import { AppContext } from '../reducers/context';


interface modalClothesInterface{ 
  open: boolean;
  onClose: () => void;
}

export default function ModalClothes({open,onClose}: modalClothesInterface): React.ReactElement {
  const { state } = React.useContext(AppContext);

  return <Modal
    open={open}
    onClose={onClose}
  >
    <>
      <div className="modal-container-clothes ">
        <div className="tessssst">
          <Grid container spacing={2}>
            <Grid item xs={6}  style={{ borderRight : '1px solid black'}}>
              <img 
                className='test dropzone'
                src='./assets/img/clothes/body.png'
                alt="boy body"
              >
              </img>
            </Grid>
            <Grid item xs={6}>
              <div className="clothes text-center">
                <p>Vêtements</p>
                <div style={{paddingTop: '30px'}}>
                  {
                    state.clothe.upperbody.map((clothe) => {
                      return(
                        <>
                          <img className="upperbody" id="yes-drop" src={`./assets/img/clothes/${clothe.description}.png`}></img>
                        </>
                      );
                    })
                  }
                </div>
                <div style={{paddingTop: '30px'}}>
                  {
                    state.clothe.lowerbody.map((clothe) => {
                      if(clothe.description){
                        return(
                          <>
                            <img className="upperbody" src={`./assets/img/clothes/${clothe.description}.png`}></img>
                          </>
                        );
                      }
                    })
                  }
                </div>
                <div style={{paddingTop: '30px'}}>
                  {
                    state.clothe.shoes.description ?
                      <img className="upperbody" src={`./assets/img/clothes/${state.clothe.shoes.description}.png`}></img>
                      : ''
                  }
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  </Modal>;
}