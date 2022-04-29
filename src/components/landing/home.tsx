import React, { useState, ReactElement, useEffect } from 'react';
import Scene from '../threeJs';
import './homeStyle.css';
import { avatarNames } from '../reducers/userReducer';
import CustomAvatar from '../avatar/customAvatar';
import { AppContext } from '../reducers/context';
import { forecastInterface } from '../interfaces/meteoInterface';
import { clotheInterface } from '../interfaces/clotheInterface';
import { getIpInterface } from '../interfaces/ipInterface';
import { convertMeteoData } from '../utils/meteoAdapter';
import { listAvatars } from '../avatar/utils';

const defaultCity = 'lyon';

function Home(): ReactElement{
  const { state, dispatch } = React.useContext(AppContext);
  const [openScene, setOpenScene] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(state.user.name);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultData, setResultData] = useState<forecastInterface[]>();
  const [resultDataClothes, setResultDataClothes] = useState<clotheInterface>();

  function fetchCity(city: string){
    fetch(`https://wtow.fr/api/data/forecast/${city}`)
      .then(async (res) =>{
        const result: forecastInterface[] = await res.json();
        setResultData(result);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  useEffect(() => {
    console.error(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if(resultData){
      const meteoData = convertMeteoData(resultData, state.meteo.day);
      dispatch({type: 'setMeteoState', value: meteoData});
    }
  }, [resultData, state.meteo.day]);


  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then((res) => {
        const result: Promise<getIpInterface> = res.json();
        result.then((response) => {
          fetchCity(response.city);
          fetchClothes(response.city, '25-03-2022');
        });
      })
      .catch((error) => {
        setErrorMessage(error);
        fetchCity(defaultCity);
      });
  }, []);

  function isActive(avatar: avatarNames){
    return avatar === state.user.avatar;
  }

  function handleOnClick(avatar: avatarNames){
    dispatch({type: 'setAvatar', value: avatar});
    dispatch({type: 'setName', value: userName});
    setOpenScene(true);
  }
  
  function fetchClothes(cityName: string,date:string){
    console.log(date);
    fetch('https://wtow.fr/api/data/clothes/paris/2022-03-25')
      .then(async (res) =>{
        const result: clotheInterface = await res.json();

        console.log(result);
        setResultDataClothes(result);
        dispatch({type: 'setUpperbody', value: result.upperbody});
        dispatch({type: 'setLowerbody', value: result.lowerbody});
        dispatch({type: 'setShoes', value: result.shoes});
        dispatch({type: 'setMisc', value: result.misc});
      })
      .catch((error) => {
        console.log('ee');
      });
  }

  useEffect(() => {
    console.error(errorMessage);
  }, [errorMessage]);


  return (
    <>
      {
        openScene
          ?
          <div style={{height: '100%', width: '100%'}}>
            <Scene />
          </div>
          :
          <div className="home-grid-container">
            <div className="home-grid-name-label">
              <h2 className='user-select-none'>Quel est ton prénom ?</h2>
            </div>
            <div className="home-grid-name-input">
              <input className="custom-input" type="text" value={userName} onChange={(event) => setUserName(event.target.value)}/>
            </div>
            <div className="home-grid-avatar-label">
              <h2>Choisis un personnage</h2>
            </div>
            <div className="home-grid-avatar-list d-flex">
              {
                listAvatars.map((avatar, index) => 
                  <div key={index} className="home-avatar-list d-flex justify-content-center">
                    <CustomAvatar
                      onClick={() => handleOnClick(avatar)}
                      avatarName={avatar}
                      size={130}
                      active={isActive(avatar)}
                    />
                  </div>
                )
              }
            </div>
          </div>
      }
    </>
  );
}
  
export default Home;