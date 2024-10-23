"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getTotalApplicants = exports.downloadResume = exports.updateApplicantStatus = exports.getApplicants = exports.applyApplicant = void 0;
var mongoose_1 = require("mongoose");
var applicantModel_1 = require("../models/applicantModel");
var stream_1 = require("stream");
var connection = mongoose_1["default"].connection;
var gfs;
connection.on("open", function () {
    gfs = new mongoose_1["default"].mongo.GridFSBucket(connection.db);
});
var applyApplicant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, resumeFile, uploadStream, readStream, newApplicant, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email;
                resumeFile = req.file;
                if (!resumeFile) {
                    return [2 /*return*/, res.status(400).json({ error: 'No file uploaded' })];
                }
                uploadStream = gfs.openUploadStream(resumeFile.originalname);
                readStream = new stream_1.Readable();
                readStream.push(resumeFile.buffer);
                readStream.push(null);
                readStream.pipe(uploadStream);
                newApplicant = new applicantModel_1["default"]({
                    name: name,
                    email: email,
                    resumeUrl: resumeFile.originalname,
                    status: 'pending'
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newApplicant.save()];
            case 2:
                _b.sent();
                res.status(201).json({ message: 'Application submitted successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ error: 'Failed to submit application' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.applyApplicant = applyApplicant;
var getApplicants = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var applicants, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, applicantModel_1["default"].find()];
            case 1:
                applicants = _a.sent();
                res.json(applicants);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: 'Failed to fetch applicants' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getApplicants = getApplicants;
var updateApplicantStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                status = req.body.status;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, applicantModel_1["default"].findByIdAndUpdate(id, { status: status })];
            case 2:
                _a.sent();
                res.json({ message: 'Status updated successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ error: 'Failed to update status' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateApplicantStatus = updateApplicantStatus;
var downloadResume = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, applicant, downloadStream, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, applicantModel_1["default"].findById(id)];
            case 2:
                applicant = _a.sent();
                if (!applicant || !applicant.resumeUrl) {
                    return [2 /*return*/, res.status(404).json({ error: 'Applicant not found or no resume available' })];
                }
                downloadStream = gfs.openDownloadStreamByName(applicant.resumeUrl);
                downloadStream.on('error', function (err) {
                    return res.status(404).json({ error: 'Resume not found' });
                });
                downloadStream.pipe(res);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ error: 'Failed to retrieve resume' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.downloadResume = downloadResume;
var getTotalApplicants = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var totalApplicants, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, applicantModel_1["default"].countDocuments()];
            case 1:
                totalApplicants = _a.sent();
                res.json({ count: totalApplicants });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ error: 'Failed to count applicants' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTotalApplicants = getTotalApplicants;
