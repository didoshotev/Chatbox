const mongoose = require('mongoose')
const { Schema } = mongoose
const Model = mongoose.model

const MessageSchema = new Schema(
    {
        userFrom: {
            type: String,
            ref: 'User',
            required: true,
        },
        // userTo: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true,
        // },
        text: {
            type: String,
            required: true,
        },
        minHours: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'messages',
    },
   
);

// MessageSchema.index({ createdAt: 1, updatedAt: 1 });

const Message = new Model('Message', MessageSchema)

module.exports = {
    Message
}