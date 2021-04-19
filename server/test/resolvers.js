const { PubSub } = require('graphql-subscriptions')

const MESSAGE_ADDED = 'MESSAGE_ADDED'
const pubSub = new PubSub()

function requireAuth(userId) {
    if (!userId) {
      throw new Error('Unauthorized');
    }
}

const Query = {
    messages: (_root, _args, { userId }) => {
    //   requireAuth(userId);
    //   return db.messages.list();
    return 'TEST QUERY'
    }
}

const Mutation = {
    addMessage: (_root, { input }, { userId }) => {
    //   requireAuth(userId);
      const messageId = db.messages.create({ from: userId, text: input.text });
      const message = db.messages.get(messageId)
      pubSub.publish(MESSAGE_ADDED, { messageAdded: message })
      return message
    }
  }
  
  const Subscription = {
    messageAdded: {
      subscribe: (_root, _args, ctx) => {
        // requireAuth(ctx.userId)
        return pubSub.asyncIterator(MESSAGE_ADDED)
      }
    }
  }
  
  module.exports = { Query, Mutation, Subscription };