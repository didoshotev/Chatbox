const { PubSub } = require('graphql-subscriptions')
const { Message } = require('./models/message')
const { timeNow } = require('./utils/times-dates')

const MESSAGE_ADDED = 'MESSAGE_ADDED'
const pubSub = new PubSub()


function requireAuth(userId) {
  if (!userId) {
    throw new Error('Unauthorized');
  }
}

const Query = {
  messages: async(_root, args, { userId }) => {
      requireAuth(userId);
      const messages = await Message.find()
      return messages
  },
}

const Mutation = {
  addMessage: async(_root, args, { username, userId }) => {
    const userFrom = username
    requireAuth(userId);

    try {
      const text = args.input.text;
      const msgObj = await Message.create({userFrom, text, minHours: timeNow()})
      if(msgObj) {
        pubSub.publish(MESSAGE_ADDED, { messageAdded: msgObj})
        return msgObj
      }
    } catch(err) {
      console.log(err);
      return err
    }
  },
}

const Subscription = {
  messageAdded: {
    subscribe: (_root, _args, { userId }) => {
      requireAuth(userId)
      return pubSub.asyncIterator(MESSAGE_ADDED)
    }
  }
}

module.exports = { Query, Mutation, Subscription };