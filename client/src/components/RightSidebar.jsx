import React, {  useContext  , useState , useEffect} from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext';

const RightSideBar = () => {

  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);
  

  // get images from messages & set to msgImages
  useEffect(() => { 
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    );
  }, [messages]);



  return  selectedUser && (
    <div className={` bg-[#FFF6B3]/60  w-full relative overflow-y-scroll  ${selectedUser ? 'max-md:hidden' : '' }`}>
      <div className='pt-12 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
          className='w-20  aspect-[1/1] rounded-full' />
        <h1 className='px-10 text-xl font-medium mx-auto gap-2
        flex items-center justify-center'>
          {onlineUsers.includes(selectedUser._id) && 
            <p className='w-2 h-2 rounded-full bg-green-500'></p>
          }
          {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>
          { selectedUser.bio || "Hey there! I am using BeeHive..." }
        </p>
      </div>
          
      <hr className='  my-4 px-3' />

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2
        gap-4 opacity-80'>
          {
            msgImages.map(
            (url, index) => (
              <div key={index} onClick={() => window.open(url)}
              className='cursor-pointer rounded'>
                <img src={url} alt="" className='h-full  rounded-md' />
                </div>))
          }
        </div>
      </div>

      <button onClick={() => logout()}
        className='absolute bottom-5 left-1/2 transform -translate-x-1/2 
      bg-gradient-to-r from-[#E0B84E]/35 to-[#E0B84E]/55 border-none
      text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
        Logout
      </button>

    </div>
  )
}

export default RightSideBar
