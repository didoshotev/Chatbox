import { Message, MessageTC } from '../models/message';

const MessageQuery = {
    messageById: MessageTC.getResolver('findById'),
    // messageByIds: MessageTC.getResolver('findByIds'),
    // messageOne: MessageTC.getResolver('findOne'),
    // messageMany: MessageTC.getResolver('findMany'),
    // messageCount: MessageTC.getResolver('count'),
    // messageConnection: MessageTC.getResolver('connection'),
    // messagePagination: MessageTC.getResolver('pagination'),
};

const MessageMutation = {
    messageCreateOne: MessageTC.getResolver('createOne'),
    // messageCreateMany: MessageTC.getResolver('createMany'),
    // messageUpdateById: MessageTC.getResolver('updateById'),
    // messageUpdateOne: MessageTC.getResolver('updateOne'),
    // messageUpdateMany: MessageTC.getResolver('updateMany'),
    // messageRemoveById: MessageTC.getResolver('removeById'),
    // messageRemoveOne: MessageTC.getResolver('removeOne'),
    // messageRemoveMany: MessageTC.getResolver('removeMany'),
};

export { MessageQuery, MessageMutation };