import User from "../models/user.model.js"

export const searchContacts = async (req, res) => {
    try {
        const { name } = req.params;
        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.user._id }},
                { $or: [
                    { name: name }
                ]}
            ]
        }).select('-password');
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const newDm = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password').populate({path: 'dm', select: 'name profilePic'});       
        res.status(200).json(user.dm)
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const oldDm = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password').populate({path: 'contacts', select: 'name profilePic'});
        res.status(200).json(user.contacts)
    } catch (error) {
        res.status(500).json(error.message)
    }
}