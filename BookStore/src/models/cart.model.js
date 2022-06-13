import { object } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
    {
      
       userId :String,
       books: [{
            bookImage: { 
              type: String
            },
            bookName: {
              type: String
            },
            author: {
              type: String,
            },
         price: {
              type: Number
            },
            quantity:{
              type:Number
            }
        }
        ],
        totalCartPrice: Number
    },

  {
    timestamps: true
  }
);

export default model('cart', cartSchema);
