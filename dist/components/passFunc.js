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
exports.passFunc = void 0;
const passFunc = (page, email, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordInput = yield page.$(`input[type="password"]`);
    let errorMessage = null;
    if (passwordInput !== null) {
        yield passwordInput.type(pass);
        yield page.waitFor(1000);
        yield page.keyboard.press('Enter');
        yield page.waitFor(1000);
        const [error] = yield page.$x('//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[1]/div/form/span/section[2]/div/div/div[1]/div[2]/div[2]/span');
        if (error !== undefined) {
            errorMessage = 'wrong password';
        }
    }
    else {
        errorMessage = 'captcha is requiered';
    }
    return { err: errorMessage };
});
exports.passFunc = passFunc;
