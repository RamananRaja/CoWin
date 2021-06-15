const mongoose = require('mongoose');

const empVaccineDetailsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        trim: true
    },
    empId: {
        type: String,
        trim: true
    },
    empName: {
        type: String,
        trim: true
    },
    mobile: {
        type: Number
    },
    email: {
        type: String,
        trim: true
    },
    cowinRefId: {
        type: Number
    },
    mobileForReg: {
        type: Number
    },
    doseNo: {
        type: String
    },
    dependent: {
        type: String,
        trim: true
    },
    beneficiaryMobile: {
        type: Number
    },
    preferredDate: {
        type: String,
        trim: true
    },
    preferredTime: {
        type: String,
        time: true
    },
    vaccineName: {
        type: String,
        trim: true
    },
    venue: {
        type: String,
        trim: true
    },
    pass: {
        type: String
    }
})

const Vaccine = mongoose.model('Vaccine', empVaccineDetailsSchema);
module.exports = { Vaccine };