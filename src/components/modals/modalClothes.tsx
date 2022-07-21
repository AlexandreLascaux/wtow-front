import { Modal,Grid, Button } from '@mui/material';
import React from 'react';
import { AppContext } from '../reducers/context';

import Draggable from 'react-draggable';


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
      <div className='modal-container-clothes '>

        <div className='tessssst'>

          <Grid container spacing={2} >
            <div style={{position: 'absolute'}}>
              <Button className='cursor-pointer' color='error' onClick={onClose}><b style={{ fontSize: '1.5rem' }}>X</b></Button>
            </div>
            <Grid item xs={6}  style={{ borderRight : '2px solid #7469CF'}}>
              <img 
                className='test dropzone'
                src='./assets/img/clothes/body.png'
                alt='boy body'
              />
            </Grid>
            <Grid item xs={6}>
              <div className='clothes text-center'>
                <p>Vêtements</p>
                <div style={{paddingTop: '30px'}}>
                  {
                    state.clothe.upperbody.map((clothe) => {
                      return(
                        <>
                          <Draggable>
                            <div>
                              <img className='upperbody' id='yes-drop' src={`./assetFs/img/clothes/${clothe.description}.png`}></img>
                            </div>
                          </Draggable>
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
                            <Draggable>
                              <img className='upperbody' src={`./assets/img/clothes/${clothe.description}.png`}></img>
                            </Draggable>
                          </>
                        );
                      }
                    })
                  }
                </div>
                <div style={{paddingTop: '30px'}}>
                  {
                    state.clothe.shoes.description ?
                      <img className='upperbody' src={`./assets/img/clothes/${state.clothe.shoes.description}.png`}></img>
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