"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var applicantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    status: { type: String, "default": 'pending' }
});
exports["default"] = mongoose_1["default"].model('Applicant', applicantSchema);
