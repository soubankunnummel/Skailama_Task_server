import mongoose from "mongoose";

const widgetSchema = mongoose.Schema({
    name: {
        type: String,

    }, 
    welcomeMessage: {
        type: String,

    },
    placeholder: {
        type: String,

    },
    primaryColor: {
        type: String,
       
    },
    fontColor: {
        type: String,
       
    },
    fontSize: {
        type: String,
       
    },
    chatHeight: {
        type: String,
       
    },
    chatIconSize: {
        type: String 
    },
    distanceFromBottom: {
        type: String 
    },
    horizontalDistance: {
        type: String 
    },
    positionOnScreen: {
        type: String 
    },
    uploadedImage: {
        type: String   
    }
},
{ timestamps: true });

const Widget = mongoose.model('Widget', widgetSchema);
export default Widget;
