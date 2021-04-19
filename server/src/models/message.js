import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const MessageSchema = new Schema(
    {
        userFrom: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userTo: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    },
    {
        collection: 'messages',
    }
);

MessageSchema.plugin(timestamps);
MessageSchema.index({ createdAt: 1, updatedAt: 1 });

export const Message = mongoose.model('Message', MessageSchema);
export const MessageTC = composeWithMongoose(Message);

// {"_id":{"$oid":"607d8b8bf70f3d19b068072a"},"name":"Ivan Ivanov","email":"ivan@abv.bg","password":"$2a$10$CccNMo7ARfN/PkM8EK8fZe.z7arw0IL9cL2d93Ru47DzYNuOhtrGO","updatedAt":{"$date":{"$numberLong":"1618840459223"}},"createdAt":{"$date":{"$numberLong":"1618840459223"}},"__v":{"$numberInt":"0"}}
// {"_id":{"$oid":"607d8debf70f3d19b068072b"},"name":"Dido Shotev","email":"dido@abv.bg","password":"$2a$10$iFZBq3I/zgyAIk8h96D6Y.zDb8saReH8Ufo842GdMlIf2zHKje03W","updatedAt":{"$date":{"$numberLong":"1618841067497"}},"createdAt":{"$date":{"$numberLong":"1618841067497"}},"__v":{"$numberInt":"0"}}