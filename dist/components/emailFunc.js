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
exports.emailFunc = void 0;
const emailFunc = (page, email, pass) => __awaiter(void 0, void 0, void 0, function* () {
    let errorMessage = null;
    yield page.goto('https://accounts.google.com/');
    const emailInput = yield page.waitForSelector('input[type="email"]');
    yield emailInput.click();
    yield emailInput.type(email);
    yield page.keyboard.press('Enter');
    yield page.waitFor(2000);
    const [emailErr] = yield page.$x('//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[2]/div[2]/div');
    if (emailErr !== undefined) {
        errorMessage = 'wrong email';
        return { err: errorMessage };
    }
    else {
        return { err: errorMessage };
    }
});
exports.emailFunc = emailFunc;
