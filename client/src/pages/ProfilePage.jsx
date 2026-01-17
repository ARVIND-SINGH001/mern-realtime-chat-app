import React  from 'react'
import assets from '../assets/assets'
import { useState , useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {

  const {authUser , updateProfile} = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const nagivate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg)
    {
      await updateProfile({fullName: name, bio});
      nagivate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      nagivate('/');

    }
    
  }


  return (
    <div className='min-h-screen  bg-cover bg-no-repeat flex items-center justify-center'>
     
      <div className=' w-[50vw] h-[70vh] backdrop-blur-2xl border-2 border-gray-600 flex items-center justify-between  rounded-lg '>
        <form onSubmit={handleSubmit} className='flex-1 p-10 flex flex-col gap-6'>
          <h1 className='text-2xl'>Profile Details</h1>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
          <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id="avatar" accept='.png, .jpeg, .jpg ' hidden  />
      
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-full' }`} /> Upload Profile Image
          </label>

          <input onChange={(e) => setName(e.target.value)} value={name} type="text" required placeholder='Your Name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2  ' />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} required placeholder='Your Bio' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2  '></textarea>
          <button type='submit' className='bg-[#E0B84E]/15 hover:bg-[#E0B84E]/35 text-black font-semibold py-2 px-4 rounded-md w-fit cursor-pointer border'>Save Changes</button>
        </form>
        
        <img className='w-60 h-60 rounded-full ' src={  selectedImg ? URL.createObjectURL(selectedImg) : (authUser?.profilePic || assets.bee_icon)} alt="" />
        
      </div>
      
      
    </div>
  )
}

export default ProfilePage
