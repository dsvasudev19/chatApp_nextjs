'use strict';

import {Model,DataTypes} from 'sequelize';
import {sequelize} from '@/app/api/models'
const User=sequelize.define("User",{
  name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  username:{
    type:DataTypes.STRING,
    allowNull:true,
  }
 })


 export default User;