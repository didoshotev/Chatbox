import { SchemaComposer } from 'graphql-compose';
import { Message, MessageTC } from '../models/message';
import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { MessageQuery, MessageMutation } from './message';

schemaComposer.Query.addFields({
    ...UserQuery,
    ...MessageQuery,
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...MessageMutation,
    // addMessage: MessageTC.getResolver('createOne'),
    ...access({
        addMessage: MessageTC.getResolver('createOne')
    })
});

// messageCreateOne: MessageTC.getResolver('createOne')

function access(resolvers) {
    Object.keys(resolvers).forEach(k => {
      resolvers[k] = resolvers[k].wrapResolve(next => rp => {
          console.log(rp);
        // rp = resolveParams = { source, args, context, info }
        // if (!rp.context.isAdmin) {
        //   throw new Error('You should be admin, to have access to this action.');
        // }
        return next(rp);
      });
    });
    return resolvers;
  }

export default schemaComposer.buildSchema();