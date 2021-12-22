import React, { useEffect, useState, ReactElement } from 'react';
import Login from '../auth/login/login'
import { Button, TextField } from '@mui/material';
import Register from '../auth/register/register';
import Counter from '../examples/counter';
import Scene from '../threeJs';

function Home(): ReactElement{
  const [openScene, setOpenScene] = useState<boolean>(true)
  const [counter, setCounter] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [win, setWin] = useState<boolean>(false)
  const [user, setUser] = useState<string | null>(null);
  
    useEffect(()=>{
      if(user){
        setOpenScene(true)
      }
    }, [user])

  function handleSubmit(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
  };
  fetch('https://reqres.in/api/posts', requestOptions)
      .then(response => response.json())
      .then(data => setUser(data.id));
  }

  function handleClose(){
    setWin(false);
  }


  return (
    <>
    {
      openScene
      ?
      <Scene user={user} />
      :
      <>
      <p>Home Page de {user}</p>
      
      <Button variant="contained" onClick={handleSubmit}>Request user</Button>
      <TextField label="Outlined" variant="outlined" color="success" onChange={(event) => setText(event.target.value)}/>
      <Counter text={text} counter={counter}/>
     
   
      <div style={{cursor: "pointer"}} onClick={() => setOpenScene(true)}> OPEN SCENE</div>
      </>
    }
    
    </>
    );
  }
  
  export default Home;