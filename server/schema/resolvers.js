const {User,Message} = require("../models/index");
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
    Query:{
        print:()=>{
            return 'Hello World';
        },

        getUsers: async()=>{
            return User.find()
            .select('-__V -password')
            .populate('messages')
            .populate('friends');
        },

        getUser: async(parent, {username})=>{
            return User.findOne({username})
            .select('-__V -password')
            .populate('messages')
            .populate('friends');
        }
    },

    Mutation:{
        addUser: async(parent, args)=>{
            const user = await User.create(args);
            const token = signToken(user);

            return {token,user};
        },
        
        userLogin: async(parent, {email,password})=>{
            const user = await User.findOne({email});
    
            if(!user){
              throw new AuthenticationError('User not found');
            }
    
            const correctPassword = await user.isCorrectPassword(password);
    
            if(!correctPassword){
              throw new AuthenticationError('User not found');
            }
    
            const token = signToken(user);
            return { token, user };
          },

          deleteOneUser: async(parent, {_id})=>{
           const user = User.deleteMany({_id: _id});

            return user;
          }
    }
};

module.exports = resolvers;