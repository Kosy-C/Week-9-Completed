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
Object.defineProperty(exports, "__esModule", { value: true });
const { generateId, writeToFile } = require("../utils/utils");
class ModelService {
    constructor(model, path) {
        this.Model = model; /* this.Model is our array in this case*/
        this.Path = path;
    }
    //this returns everything, sends the whole model back!(GET/READ)
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                resolve(this.Model);
            });
        });
    }
    //this finds one, either by id or an email (GET/READ)
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const key = Object.keys(query)[0];
                const value = Object.values(query)[0];
                const response = this.Model.find(data => data[key] === value);
                if (response) {
                    resolve(response);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    //CREATE in CRUD
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const id = generateId(this.Model);
                const dataToSave = Object.assign({ id }, data);
                this.Model.push(dataToSave);
                writeToFile(this.Path, this.Model); /*where this.path is the directory folder and this.Model is the data we wnt to write */
                resolve(dataToSave);
            });
        });
    }
    update(query, target) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const id = Object.values(query)[0]; /*id here can be user id or product id  */
                const dataIndex = this.Model.findIndex((data) => data.id === id);
                if (dataIndex === -1) { /* dis means that if the data id we're looking for in that array(this.Model) is not there, return false*/
                    resolve(false);
                }
                else {
                    this.Model[dataIndex] = Object.assign({}, target); /*this.Model is our array  */
                    writeToFile(this.Path, this.Model);
                    resolve(this.Model[dataIndex]);
                }
            });
        });
    }
    remove(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const id = Object.values(query)[0];
                this.Model = this.Model.filter((data) => data.id !== id);
                writeToFile(this.Path, this.Model);
                resolve(true);
            });
        });
    }
}
exports.default = ModelService;
//# sourceMappingURL=model.service.js.map