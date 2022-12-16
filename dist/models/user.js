"use strict";
// // import { DataTypes, Model } from 'sequelize';
// import db from '../database/db';
// import { IUser } from './typings';
// //Creat a new instance of the class and start using it
// export class UserInstance extends Model<IUser>{ }
// UserInstance.init({
//    id: {
//     type:DataTypes.UUIDV4,
//     primaryKey:true,
//     allowNull:false
//   },
//   fullname:{
//      type:DataTypes.STRING,
//      allowNull:false,
//      validate:{
//          notNull:{
//              msg:'fullname is required'
//          },
//          notEmpty:{
//              msg:'Please provide your fullname'
//          }
//      }
//   },
//     email:{
//     type:DataTypes.STRING,
//     allowNull:false,
//     unique:true,
//     validate:{
//         notNull:{
//             msg:'email is required'
//         },
//         isEmail:{
//             msg:'Please provide a a valid Email'
//         }
//     }
//     },
//     password:{
//     type:DataTypes.STRING,
//     allowNull:false,
//     validate:{
//         notNull:{
//             msg:'password is required'
//         },
//         notEmpty:{
//             msg:'Please provide a password'
//         }
//     }
//   },
//     gender: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate:{
//         notNull:{
//             msg:'phone number is required'
//         },
//         notEmpty:{
//             msg:'Please provide a valid phone number'
//         }
//     } 
//     },
//     phonenumber:{
//     type:DataTypes.STRING,
//     allowNull:false,
//     unique:true,
//     validate:{
//         notNull:{
//             msg:'phone number is required'
//         },
//         notEmpty:{
//             msg:'Please provide a valid phone number'
//         }
//     } 
//     },
//     address:{
//     type:DataTypes.STRING,
//     allowNull:false,
//     validate:{
//         notNull:{
//             msg:'phone number is required'
//         },
//         notEmpty:{
//             msg:'Please provide a valid phone number'
//         }
//     } 
//   },
// }, 
// //  {  //This shows that we are building db and the type of table
// //     sequelize: db,
// //     tableName: 'user',
// // }
// );
// UserInstance.hasMany(ProductInstance,
//     {   foreignKey: 'userId',
//         as: 'product'
//     })
// ProductInstance.belongsTo(UserInstance,
//   {   foreignKey: 'userId',
//         as: 'user'
//     })
//# sourceMappingURL=user.js.map