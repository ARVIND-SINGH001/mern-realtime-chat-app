import React, { useContext , useState } from 'react'
import assets from '../assets/assets' 
import { AuthContext } from '../context/AuthContext'


const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);


  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted)
    { // Proceed to bio input
      setIsDataSubmitted(true);
      return;
    }
 
    login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio });
  }



  return (
    <div className='min-h-screen bg-cover bg-center flex items-center 
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      { /* Left */}
      <img src={assets.bee_icon} alt="" className='w-[min(30vw,250px)]'/>


      { /* Right */}
      <form onSubmit={onSubmitHandler}
        className='border-2 bg-white/8  border-gray-500 p-6 flex
      flex-col gap-6 rounded-lg shadow-lg'>

        <h2 className=' font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img
            onClick={() => setIsDataSubmitted(false)}
            src={assets.arrow_icon} alt="" className='w-8 h-8  cursor-pointer' />}
          
        </h2>
        
        {currState === "Sign up" && !isDataSubmitted && (<input
          onChange={(e) => setFullName(e.target.value)} value={fullName} 
          type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E0B84E]/35 ' placeholder='Full Name' required />)}
        
        {!isDataSubmitted && (
          <>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email Address' required
              className='p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#E0B84E]/35' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required
              className='p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#E0B84E]/35' />
          </>
        )}

        {/* Bio input for Sign up after initial data submission */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea onChange={(e)=> setBio(e.target.value)} value={bio}
            rows={4} className='p-2 border border-gray-500 rounded-md
            focus:outline-none focus:ring-2 focus:ring-[#E0B84E]/35'
            placeholder='Write your bio here ...' required
          ></textarea>
        )}

        <button type='submit' className='py-3 bg-gradient-to-r 
        from-[#E0B84E]/35 to-[#E0B84E]/55 rounded-md cursor-pointer'>
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" className='flex items-center gap-2 text-sm 
          text-gray-500'/>
          <p>Agree to the terms of use & privacy policy.</p>
        </div>


        <div className='flex justify-center  gap-2'> 
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account ?
              <span className='font-medium cursor-pointer text-black' onClick={() =>
              {setCurrState("Login"); setIsDataSubmitted(false);}} >Login here</span></p>
          ) : (
              <p className='flex items-center gap-2 text-sm text-gray-500'
                onClick={() => { setCurrState("Sign up");  }}
              >
                Create an account :<span className='font-medium cursor-pointer text-black'>Create here</span></p>
           )}
        </div>
        
        
      </form>

    </div>
  )
}

export default LoginPage
