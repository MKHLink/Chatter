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
        },

        me: async(parent,args,context)=>{
            if(context.user){
              const user = await User.findOne({_id:context.user._id})
              .select('-__v -password')
              .populate('friends');
  
              return user;
            }

            throw new AuthenticationError('User not logged in');
          },
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
          },

          addPartner: async(parent, {friendId},context)=>{
            if(context.user)
            {
                const user = User.findOneAndUpdate(
                    {_id:context.user._id},
                    {friends: friendId},
                    {new: true}
                ).populate('friends');
                

                return user;
            }
            throw new AuthenticationError('User not logged in');
          }
    }
};

module.exports = resolvers;