import React, { useContext, useEffect, useRef , useState} from 'react'
import assets  from '../assets/assets'
import { formateMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {

  const { messages, selectedUser, setSelectedUser, sendMessage,
    getMessages
  } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  

  const scrollEnd = useRef()

  const [input, setInput] = useState('');

  // handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  }

  // handle send image

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    }
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {

    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])
  //----------------------------  





  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      { /* -------Header-------*/}
      <div className='flex items-center gap-3 py-3 mx-4 border-b boder-stone-500'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-8 h-8 rounded-full' />
        <p className='flex-1 text-lg text-black flex items-center gap-2 font-semibold'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>}
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <i className="ri-information-2-line text-3xl"></i>
      </div>

      
      { /* -------Chat-Area-------1111*/}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.filter(Boolean).map((msg, index) => (
          <div key={index} className={`flex items-end  gap-2 justify-end 
        ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
         
            {msg.image ? (
              <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) :
              (
                <p className={`p-2 max-w-[200px] md:text-sm font-light
                  rounded-lg mb-8 break-all bg-[#E0B84E]/35 ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}  `}>{msg.text}</p>
              )}
            <div className='text-center text-xs'>
              <img src={msg.senderId === authUser._id ? authUser?.profilePic ||
                assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} className='w-7 h-7 rounded-full' alt="" />
              <p className='text-gray-500'>{formateMessageTime(msg.createdAt)}</p>
            </div>

          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      { /* -------Input-Area-------*/}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-[#E0B84E]/25 px-3 rounded-full'>
          <input onChange={(e) => setInput(e.target.value)} value={input}
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null} type="text" placeholder='Send a message'
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none placeholder-gray-600' />
          <input onChange={handleSendImage} type="file" id="image" accept='image/png , image/jpeg' hidden />
          <label htmlFor="image" >
            <i className="ri-image-2-line w-5 mr-2 cursor-pointer text-2xl " ></i>
          </label>
        </div>
        <i onClick={handleSendMessage} className="ri-send-plane-fill pointer text-2xl bg-[#E0B84E]/25 p-1.5 rounded-full  cursor-pointer"></i>
      </div>


    </div>
  ) : (

    <div className='flex flex-col  items-center justify-center gap-2 max-md:hidden'>
      <img src={assets.bee_icon} className=" h-40  " alt="" />
      <p>Buzz, Chat, Repeat !</p>
    </div>

  )
}

export default ChatContainer
