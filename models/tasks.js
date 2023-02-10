const {Schema,model}=require("mongoose")
 const taskSchema=Schema({
  title:{
    type: String,
    required: [true, 'Set title for task']
  },
  text:{
    type: String,
    required: [true, 'Set text for task'],
  },
  done:{
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
 })
 const Task=model("task",taskSchema)
module.exports=Task