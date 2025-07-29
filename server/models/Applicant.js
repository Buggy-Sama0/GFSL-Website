const mongoose=require('mongoose');

const applicantSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    service: String,
    documents: String
});

const Applicant=mongoose.model('Applicant', applicantSchema);
module.exports=Applicant;
