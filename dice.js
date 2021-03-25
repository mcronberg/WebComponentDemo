"use strict";
const template = document.createElement("template");
template.innerHTML = `
<style>
span {
  font-family: 'Courier New', Courier, monospace;
}
</style>
  <span>[<span id="value"></span>]</span>
`;
class Dice extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.options = {};
    this.options.værdi = this.getAttribute("value");
    this.options.debug = this.getAttribute("debug");
    this.options.cheat = this.getAttribute("cheat");
    this.options.backgroundcolorsix = this.getAttribute("backgroundcolorsix");
    this.options.forgroundcolorsix = this.getAttribute("forgroundcolorsix");
    this.log("Dice created with...", this.options);
    if (this.options.value == null || this.options.value < 1 || this.options.value > 6) {
      this.options.value = this.randomNumber();
    }
    this.showValue();
  }

  showValue() {
    this.log("Shadow DOM to value: " + this.options.value);
    let v = this.shadowRoot.querySelector("span#value");
    v.innerHTML = this.options.value;
    if ((this.options.forgroundcolorsix || this.options.backgroundcolorsix) && this.options.value == 6) {
      this.log("Adding color");
      v.style.color = this.options.forgroundcolorsix;
      v.style.backgroundColor = this.options.backgroundcolorsix;
    } else {
      v.style.color = "black";
      v.style.backgroundColor = "white";
    }
  }

  shake() {
    this.log("Shaking dice " + this.options.value);
    this.options.value = this.randomNumber();
    this.log("Dice is now " + this.options.value);
    this.showValue();
  }

  randomNumber() {
    this.log("Getting random number");
    if (this.options.cheat) {
      let n = Math.random();
      this.log("This is a cheat-dice so if " + n + " is less than 0.5 it will become a value of six");
      if (n < 0.5) {
        this.log("Returning six as a 'random' number");
        return 6;
      }
    }
    let t = Math.floor(Math.random() * 6) + 1;
    this.log("Random number found as " + t);
    return t;
  }

  log(txt, o) {
    if (this.options.debug) {
      if (!o) console.log(txt);
      else console.log(txt, o);
    }
  }
}

window.customElements.define("cronberg-dice", Dice);
