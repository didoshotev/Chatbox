const { PubSub } = require('graphql-subscriptions')
// const { User, Message } = require('./models')
const { User } = require('./models/user')
const { Message } = require('./models/message')

const MESSAGE_ADDED = 'MESSAGE_ADDED'
const pubSub = new PubSub()


function requireAuth(userId) {
  if (!userId) {
    throw new Error('Unauthorized');
  }
}

const Query = {
  messages: (_root, args, context, info) => {
    // console.log(Message);
    //   requireAuth(userId);
    // return Message.findOne().then(res => {
    //   console.log('RES:', res);
    // })
    //   return db.messages.list();
  },
  user: async(_root, args, context, info) => {
    try {
      const { id } = args
      const userObj = await User.findById(id)
      if(userObj) {
        console.log(userObj);
        return userObj
      }
    } catch (err) {
      console.log('ERROR IN FETCHING USER');
      return err
    }
  }
}

const Mutation = {
  addMessage: async(_root, args, context) => {
    const userId = '607e8a4f4903722518ce772e'
    const receiverId = '607e8b25a097b33ef8985540'
    //   requireAuth(userId);
    // const messageId = db.messages.create({ from: userId, text: input.text });
    // const message = db.messages.get(messageId)
    // pubSub.publish(MESSAGE_ADDED, { messageAdded: message })
    try {
      const text = args.input.text;
      const msgObj = await Message.create({userFrom: userId, userTo: receiverId, text})
      if(msgObj) {
        console.log(msgObj);
        return msgObj
      }
    } catch(err) {
      console.log(err);
      return err
    }
  },
  addUser: async (_root, args, data2) => {
    try {
      const { username, email, password } = args
      const userObj = await User.create({ username, email, password })
      if (userObj) {
        return userObj.data.addUser
      }
    } catch (err) {
      console.log('ERROR IN CREATING USER');
      return err
    }
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