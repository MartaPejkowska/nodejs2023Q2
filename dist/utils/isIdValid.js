"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdValid = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const isIdValid = (id) => {
    if (!(0, uuid_1.validate)(id)) {
        throw new common_1.BadRequestException('Not valid id');
    }
};
exports.isIdValid = isIdValid;
//# sourceMappingURL=isIdValid.js.map