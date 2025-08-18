const mongoose=require('mongoose');

const applicantSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    service: String,
    document_1: String,
    document_2: String,
    document_3: String,
    document_4: String,
    document_5: String,
    document_6: String,
    document_7: String,
    document_8: String,
    document_9: String,
});

const Applicant=mongoose.model('Applicant', applicantSchema);
module.exports=Applicant;
