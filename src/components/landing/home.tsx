import React, { useEffect, useState } from 'react';
import Login from '../auth/login/login'
import Register from '../auth/register/register';

function Home(): React.ReactElement{
  return (
    <>
        <p>Home Page</p>
        <Login/>
    </>
  );
}

export default Home;