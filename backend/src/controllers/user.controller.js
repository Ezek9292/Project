import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        //basic validation

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //check if user already exist
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already exist' });
        }
        // create new user
        const newUser = new User({ username, password, email: email.toLowerCase() });
        await newUser.save(); 

        // const user = await User.create({ 
        //     username, 
        //     password, 
        //     email: email.toLowerCase(),
        //     loggedIn: false
        // });
        return res.status(201).json({ message: 'User registered successfully', user: { id: newUser._id, username: newUser.username, email: newUser.email } });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: `there is an error here: ${error.message}`})
    }
};


const loginUser = async (req, res) => {
    //login logic here
    try {
        // if the user exist
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // check if password match
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // if login successful
        user.loggedIn = true;
        await user.save();
        res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    }

}

const logOutuser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });
        if (!user) return res.status(404).json({
            message: "Logout succesful"
        });
    } catch (error) {
        res.status(500).json({
            message: "internal Sever Error", error
        });
    }
}

export {
    registerUser,
    loginUser,
    logOutuser
}