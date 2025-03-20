import Group from "../models/group.model.js"
import User from "../models/user.model.js"

export const getGroupContacts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({path: 'groupContacts', select: 'name'})
        res.json(user.groupContacts);
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const createGroup = async (req, res) => {
    try {
        const {name, members} = req.body;
        const groupContacts = req.user.groupContacts;

        if (!name) {
            return res.status(400).json({success: false, message: 'Provide Name'})
        }

        if (!members) {
            return res.status(400).json({success: false, message: 'Select Members'})
        }

        const validMembers = members.every(member => groupContacts.includes(member));
        if (!validMembers) {
            return res.status(400).json({success: false, message: 'Some Members are not Valid'})
        }
        const newGroup = new Group({
            name,
            members,
            admin: req.user._id
        })
        await newGroup.save();
        res.status(200).json({success: true, newGroup, message: 'Group Created'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const getGroups = async (req, res) => {
    try {
        const userId = req.user._id;
        const groups = await Group.find({
            $or: [
              { admin: userId },
              { members: {$in: [userId]} }
            ]
          }).populate('members admin', 'name profilePic');
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}