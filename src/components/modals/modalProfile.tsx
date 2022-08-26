import React from 'react';
import { Button, Dialog } from '@mui/material';
import CustomAvatar from '../avatar/customAvatar';
import { listAvatars } from '../avatar/utils';
import { AppContext } from '../reducers/context';
import { avatarNames } from '../reducers/userReducer';

interface modalProfileInterface{ 
  open: boolean;
  onClose: () => void;
}


export default function ModalProfile({open, onClose}: modalProfileInterface): React.ReactElement {

  const { state, dispatch } = React.useContext(AppContext);
  
  function isActive(avatar: avatarNames){
    return avatar === state.user.avatar;
  }

  return <Dialog
    open={open}
    onClose={onClose}
    className="custom-paper"
  >
    <div className="modal-container">
      <div style={{position: 'absolute', top: '5px', right: '0px'}}>
        <Button className='cursor-pointer' color="error" onClick={onClose}><b style={{ fontSize: '1.5rem' }}>X</b></Button>
      </div>
      <div className="child">
        <div className="modal-inputs">
          <h2 id="modal-title">Change ton nom ici</h2>
          <input className="modal-input" type="text" value={state.user.name} onChange={(event) => dispatch({type: 'setName', value: event.target.value})}/>
        </div>
        <div className="home-grid-avatar-list d-flex">
          {
            listAvatars.map((avatar, index) => 
              <div key={index} className="home-avatar-list d-flex justify-content-center">
                <CustomAvatar
                  onClick={() => dispatch({type: 'setAvatar', value: avatar })}
                  avatarName={avatar}
                  size={60}
                  active={isActive(avatar)}
                />
              </div>
            )
          }   
        </div>
      </div>
    </div>
  </Dialog>;
}