"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const DataUtil_1 = require("../../util/DataUtil");
class ProductEntity {
    id;
    name;
    price;
    expirationDate;
    constructor(id, name, price, expirationDate) {
        this.validatesInformation(name, price, expirationDate);
        this.id = id || 0;
        this.name = name || '';
        this.price = price || 0;
        this.expirationDate = (0, DataUtil_1.stringParaData)(expirationDate || '');
    }
    validatesInformation(name, price, expirationDate) {
        let error = '';
        if (typeof name !== 'string' || typeof price !== 'number' || typeof expirationDate !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }
        if (!(0, DataUtil_1.verificaFormatoData)(expirationDate)) {
            error += ("A data deve possuir o formato: dd/MM/yyyy");
        }
        if (error != '') {
            throw new Error(error);
        }
    }
}
exports.ProductEntity = ProductEntity;
