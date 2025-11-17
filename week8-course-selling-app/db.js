const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;



const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const Admin = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const Course = new Schema({
    title : String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const Purchase = new Schema({
    userId: ObjectId,
    courseId: ObjectId

})

const UserModel = mongoose.model('users', User);
const AdminModel = mongoose.model('admin', Admin);
const CourseModel = mongoose.model('courses', Course);
const PurchaseModel = mongoose.model('purchases', Purchase);

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}