const { PubSub } = require('graphql-subscriptions')
// const { User, Message } = require('./models')
const { User } = require('./models/user')
const { Message } = require('./models/message')
const { jwt } = require('./utils')

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
  user: async(_root, args, context, info) => {
    try {
      const { id } = args
      const userObj = await User.findById(id)
      if(userObj) {
        return userObj
      }
    } catch (err) {
      console.log('ERROR IN FETCHING USER');
      return err
    }
  },
}

const Mutation = {
  addMessage: async(_root, args, { input }, { username }) => {
    console.log(9999);
    const userFrom = 'deffect'
    //   requireAuth(userId);
    
    try {
      const text = args.input.text;
      const time = new Date()
      const timeResult = `${time.getHours()}:${time.getMinutes()}`
      const msgObj = await Message.create({userFrom, text, minHours: timeResult})
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
    subscribe: (_root, _args, ctx) => {
      // requireAuth(ctx.userId)
      return pubSub.asyncIterator(MESSAGE_ADDED)
    }
  }
}

module.exports = { Query, Mutation, Subscription };