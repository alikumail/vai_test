import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { userType, email, password, name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    userType,
    email,
    password: hashedPassword,
    name
  });

  try {
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { id: savedUser._id, email: email },
      process.env.JWT_SECRET || 'Shahsa8279aa*',
      { expiresIn: '1d' } 
    );
    return res.status(200).json({message:"Register successfully",data:savedUser,access_token:token});
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const addUser = async (req, res) => {
  const { userType, email, password, name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    userType,
    email,
    password: hashedPassword,
    name
  });

  try {
    const savedUser = await newUser.save();
    return res.status(200).json({message:"Added successfully",data:savedUser});
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId);
        return res.status(200).json({status:true,data:user});
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ status:false,message: err.message });
    } else {
      res.status(500).json({ status:false,message: "An unknown error occurred" });
    }
  }
};
export const getUsers = async (req, res) => {
  try {
    let filter = {};
    if(req.query.userType!="all")
    {
      filter = { userType: req.query.userType };
    }
    const users = await User.find(filter);
    return res.status(200).json({status:true,data:users});
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ status:false,message: err.message });
    } else {
      res.status(500).json({ status:false,message: "An unknown error occurred" });
    }
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body; // Assuming we're only allowing name and email updates

  try {
    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
    console.log(req.params);
  try {
    await User.findByIdAndRemove(userId);
    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'Shahsa8279aa*',
      { expiresIn: '1d' } 
    );

    return res.header('auth-token', token).status(200).json({
      message: 'Logged in successfully',
      access_token:token,
      user: { id: user._id, email: user.email, userType: user.userType, name: user.name }
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
 