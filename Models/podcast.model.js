import mongoose, { Schema } from "mongoose"


const podcastSchema = Schema({
     title: {
          type: String,
          required: true
     }, 
 
     description: {
          type: String,
          required: true
     },
     project: {
          type: Schema.Types.ObjectId,
          ref: 'Project'
     },
     date: {
          type: Date,
          default: Date.now
      },
      status:{
          type: String,
          enum: ['Done', 'inactive'],
          default: 'Done'
      },


    
    
})
const Podcast = mongoose.model('Podcast', podcastSchema)
export default Podcast