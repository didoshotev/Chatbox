import { User, UserTC } from '../models/user';

const UserQuery = {
    userById: UserTC.getResolver('findById'),
    // userByIds: UserTC.getResolver('findByIds'),
    // userOne: UserTC.getResolver('findOne'),
    // userMany: UserTC.getResolver('findMany'),
    // userCount: UserTC.getResolver('count'),
    // userConnection: UserTC.getResolver('connection'),
    // userPagination: UserTC.getResolver('pagination'),
};

const UserMutation = {
    userCreateOne: UserTC.getResolver('createOne'),
    // userCreateMany: UserTC.getResolver('createMany'),
    // userUpdateById: UserTC.getResolver('updateById'),
    // userUpdateOne: UserTC.getResolver('updateOne'),
    // userUpdateMany: UserTC.getResolver('updateMany'),
    // userRemoveById: UserTC.getResolver('removeById'),
    // userRemoveOne: UserTC.getResolver('removeOne'),
    // userRemoveMany: UserTC.getResolver('removeMany'),
};

export { UserQuery, UserMutation };

// {"_id":{"$oid":"607d88f61b22e81f86bafd89"},"username":"Dido Shotev"}