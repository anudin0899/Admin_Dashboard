import React, { useState } from 'react'
import SignIn from '../../Components/SignIn/SignIn'
import SignUp from '../../Components/SignUp/SignUp'

const Login = () => {

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div>
        {toggle ?
          <SignUp toggle={setToggle}/>
          :
          <SignIn toggle={setToggle}/>
        }
      </div>
    </>

  )
}

export default Login