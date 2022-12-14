/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => SimpleDiceRoller
});
var import_obsidian = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  showAverageRibbonIcon: true,
  showSimulateRibbonIcon: false
};
var SimpleDiceRoller = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.averageRibbonIconEl = void 0;
    this.simulateRibbonIconEl = void 0;
  }
  getAllFormulas() {
    var _a;
    let captureAllFormulas = /\d?d\d+.*?(?= |\n|$)/gi;
    const markdownView = (_a = this.app.workspace) == null ? void 0 : _a.getActiveViewOfType(import_obsidian.MarkdownView);
    let allFormulas = markdownView == null ? void 0 : markdownView.getViewData().match(captureAllFormulas);
    if (allFormulas == null) {
      new import_obsidian.Notice("No dice found on screen");
      return null;
    }
    console.log("================================================================");
    console.log("Simple Dice Roller");
    console.log("================================================================");
    console.log(`Calculating for ${allFormulas.length} formulas`);
    return allFormulas;
  }
  simulateAllDiceOnScreen() {
    let allFormulas = this.getAllFormulas();
    if (allFormulas == null) {
      return;
    }
    for (let i = 0; i < allFormulas.length; i++) {
      let formula = allFormulas[i];
      let result = this.simulateDiceFormula(formula);
      new import_obsidian.Notice(`Simulated ${formula}: ${result}`);
    }
    console.log("================================================================");
  }
  averageAllDiceOnScreen() {
    let allFormulas = this.getAllFormulas();
    if (allFormulas == null) {
      return;
    }
    for (let i = 0; i < allFormulas.length; i++) {
      console.log(`Calculating ${allFormulas[i]}`);
      new import_obsidian.Notice(`Average of ${allFormulas[i]}: ${this.calculateFormula(allFormulas[i])}`);
    }
    console.log("================================================================");
  }
  calculateFormula(formula) {
    let splitAllDice = /\d?d\d+/gi;
    let constAdditions = /(?<=\+)(\d+)(?=\+|$)/gi;
    let diceAmount = /\d+/gi;
    let diceSize = /(?<=d).*/gi;
    let sum = 0;
    let dice = formula.match(splitAllDice);
    console.log(`Found ${dice.length} dice`);
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].charAt(0) == "d" || dice[i].charAt(0) == "D") {
        dice[i] = "1" + dice[i];
      }
      let amountOfDice = parseInt(dice[i].match(diceAmount)[0], 10);
      let sizeOfDice = parseInt(dice[i].match(diceSize)[0], 10);
      sum += Math.ceil(this.averageDice(amountOfDice, sizeOfDice));
    }
    let additions = formula.match(constAdditions);
    if (additions) {
      console.log(`Found ${additions.length} additions`);
      for (let i = 0; i < additions.length; i++) {
        sum += parseInt(additions[i], 10);
      }
    }
    return sum;
  }
  averageDice(numberOfDice, sizeOfDice) {
    return numberOfDice * this.averageDie(sizeOfDice);
  }
  averageDie(number) {
    return (number + 1) / 2;
  }
  getRandomInt(min, max) {
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
      return this.getRandomInt(min, max);
    return min + byteArray[0] % range;
  }
  simulateDice(numberOfDice, sizeOfDice) {
    let sum = 0;
    for (let i = 0; i < numberOfDice; i++) {
      sum += this.getRandomInt(1, sizeOfDice);
    }
    return sum;
  }
  simulateDiceFormula(formula) {
    let splitAllDice = /\d?d\d+/gi;
    let constAdditions = /(?<=\+)(\d+)(?=\+|$)/gi;
    let diceAmount = /\d?/gi;
    let diceSize = /(?<=d).*/gi;
    let sum = 0;
    let dice = formula.match(splitAllDice);
    console.log(`Found ${dice.length} dice`);
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].charAt(0) == "d" || dice[i].charAt(0) == "D") {
        dice[i] = "1" + dice[i];
      }
      let amountOfDice = parseInt(dice[i].match(diceAmount)[0], 10);
      let sizeOfDice = parseInt(dice[i].match(diceSize)[0], 10);
      sum += this.simulateDice(amountOfDice, sizeOfDice);
    }
    let additions = formula.match(constAdditions);
    if (additions) {
      console.log(`Found ${additions.length} additions`);
      for (let i = 0; i < additions.length; i++) {
        sum += parseInt(additions[i], 10);
      }
    }
    return sum;
  }
  refreshRibbon() {
    var _a, _b;
    (_a = this.averageRibbonIconEl) == null ? void 0 : _a.remove();
    (_b = this.simulateRibbonIconEl) == null ? void 0 : _b.remove();
    if (this.settings.showAverageRibbonIcon) {
      this.averageRibbonIconEl = this.addRibbonIcon("dice", "Average all dice", (evt) => {
        this.averageAllDiceOnScreen();
      });
    }
    if (this.settings.showSimulateRibbonIcon) {
      this.simulateRibbonIconEl = this.addRibbonIcon("dice", "Simulate all dice", (evt) => {
        this.simulateAllDiceOnScreen();
      });
    }
  }
  onload() {
    return __async(this, null, function* () {
      this.addSettingTab(new SimpleDiceRollerTab(this.app, this));
      yield this.loadSettings();
      this.addCommand({
        id: "average-all-dice",
        name: "Calculate averages for all dice on page",
        callback: () => {
          this.averageAllDiceOnScreen();
        }
      });
      this.addCommand({
        id: "simulate-all-dice",
        name: "Simulates all dice formulas on page",
        callback: () => {
          this.simulateAllDiceOnScreen();
        }
      });
      this.refreshRibbon();
    });
  }
  onunload() {
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
var SimpleDiceRollerTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Simple Dice Roller Settings" });
    new import_obsidian.Setting(containerEl).setName("Average Dice Roll on Ribbon Bar").setDesc("Show button on ribbon bar that will average all dice on page.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showAverageRibbonIcon).onChange((value) => __async(this, null, function* () {
        this.plugin.settings.showAverageRibbonIcon = value;
        yield this.plugin.saveSettings();
        this.plugin.refreshRibbon();
      }));
    });
    new import_obsidian.Setting(containerEl).setName("Simulate Dice Roll on Ribbon Bar").setDesc("Show button on ribbon bar that will simulate all dice on page.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showSimulateRibbonIcon).onChange((value) => __async(this, null, function* () {
        this.plugin.settings.showSimulateRibbonIcon = value;
        yield this.plugin.saveSettings();
        this.plugin.refreshRibbon();
      }));
    });
  }
};
