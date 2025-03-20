import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            required: false
        }
    ]
})

const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);
export default Group