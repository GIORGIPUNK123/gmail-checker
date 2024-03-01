#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const puppeteer_1 = __importDefault(require("puppeteer"));
const select_1 = __importDefault(require("@inquirer/select"));
const prompts_1 = require("@inquirer/prompts");
const main_1 = require("./main");
const fs_1 = require("fs");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: true,
        args: [
            '--disable-gpu',
            '--no-sandbox',
            '--lang=en-US',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-blink-features=AutomationControlled',
        ],
    });
    commander_1.program.version('1.0.0').description('Gmail account checker');
    commander_1.program.description('Check Gmail Accounts').action(() => __awaiter(void 0, void 0, void 0, function* () {
        const comboFilePath = yield (0, prompts_1.input)({
            message: 'Enter email:password txt file path',
        });
        // const threads = parseInt(
        //   await input({
        //     message: 'Enter thread amount max is 20',
        //   })
        // );
        const clearOldOutput = yield (0, select_1.default)({
            message: 'Do you want to clear old output?',
            choices: [
                {
                    name: 'Yes',
                    value: 'yes',
                },
                {
                    name: 'No',
                    value: 'no',
                },
            ],
        });
        try {
            const data = yield fs_1.promises.readFile(comboFilePath, 'utf8');
            const combo = data.split('\r\n').filter((x) => x !== '');
            if (clearOldOutput === 'yes') {
                yield fs_1.promises.writeFile('./out/valid_gmails.txt', '');
                yield fs_1.promises.writeFile('./out/invalid_gmails.txt', '');
            }
            yield (0, main_1.main)(browser, combo);
        }
        catch (err) {
            console.log('invalid file path, please try again ', err);
        }
        //   message: 'Select',
        //   choices: [
        //     {
        //       name: 'basic',
        //       value: 'basic',
        //       description: 'Get basic info about your gpa and grades',
        //     },
        //     ...(await (async () => {
        //       const subjects = [''];
        //       return subjects.map((x) => ({
        //         name: x,
        //         value: x,
        //         description: 'Find more about this subject',
        //       }));
        //     })()),
        //   ],
        // });
        // await page.waitForNetworkIdle();
        // await mainFunc(page, browser, pirn, answer);
        // await browser.close();
    }));
    yield commander_1.program.parseAsync(process.argv);
}))();
