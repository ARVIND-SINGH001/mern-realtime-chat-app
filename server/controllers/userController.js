import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

// signup  a new user

export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.json({ success: false, message: "Please provide all required fields."});
        }
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exists with this email." });
        }

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);
        res.json({ success: true, userData : newUser, message: "User registered successfully.", token } );
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.json({ success: false, message: "Server error during signup." });
    }
}
        

// login an existing user

export const login = async (req, res) => {
    const {  email, password } = req.body;
    
    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.json({ success: false, message: "Invalid credentials." });
        }
          const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials." });
        }

              const token = generateToken(userData._id);
              res.json({ success: true, userData, message: "Login successful.", token });
              
        
        
    } catch (error) {
        console.error("Error during login:", error);
        res.json({ success: false, message: "Server error during login." });
        
    }
    
}


// contoller to check if user is authenticated

export const checkAuth = async (req, res) => {
    res.json({ success: true, userData: req.user });
}


// controller to updtae user profile

export const updateProfile = async (req, res) => {

try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;

    let updatedUser;
      
    if (!profilePic)
    {
        updatedUser = await User.findByIdAndUpdate(
            userId,
            { bio, fullName },
            { new: true }
        );
    } else
    {
        // upload profile pic to cloudinary
        const upload =  await cloudinary.uploader.upload(profilePic);
         
        updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: upload.secure_url , bio, fullName },
            { new: true }
        );
    }
    res.json({ success: true, user: updatedUser });
    


} catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
}


}