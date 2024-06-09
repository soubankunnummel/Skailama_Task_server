

import Widget from "../Models/widget.mode.js";

/// ->>    creating widget
export const createWidget = async (req, res) => {
  const {
    name,
    welcomeMessage,
    placeholder,
    primaryColor,
    fontColor,
    fontSize,
    chatHeight,
    chatIconSize,
    distanceFromBottom,
    horizontalDistance,
    positionOnScreen, 

  } = req.body;


  let uploadedImage = "";
if(req.file) {
   uploadedImage = req.image
}
  const newWidget = new Widget({
    name,
    welcomeMessage,
    placeholder,
    primaryColor,
    fontColor,
    fontSize,
    chatHeight,
    chatIconSize,
    distanceFromBottom,
    horizontalDistance,
    positionOnScreen,
    uploadedImage:uploadedImage
  });

  await newWidget.save();

  res.status(201).json(newWidget);
};


// add genaral details of the widget

export const addDetails = async (req, res) => {

  const {name, welcomeMessage, placeholder}  = req.body
  if(!name || !welcomeMessage || !placeholder) return res.status(400).json({ message: "All fields are required" });
  const widget = await Widget.findOne().sort({ createdAt: -1 });

  widget.name = name
  widget.welcomeMessage = welcomeMessage
  widget.placeholder = placeholder
  await widget.save()
  res.status(200).json(widget);


}



/// get widgets


export const getWidget = async (req, res) => {
  const latestWidget = await Widget.findOne().sort({ createdAt: -1 });
  res.status(200).json(latestWidget);
};
