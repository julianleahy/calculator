$(function () {
  class Calculator {
    constructor() {
      this._current = []; // either number or operators
      this._chain = []; // numbers and operator together 
    }

    set current(value) {
      this._current.push(value);
    }

    get current() {
      return this._current.join('');
    }

    set chain(value) {
      this._chain.push(value);
    }

    get chain() {
      return this._chain.join('');
    }

    // show current number and a chain of all numbers and operands
    displayOutput(current = '0', chain = '0') {
      $('.output').html(current);
      $('.chain').html(chain);
    }
  } //= End Calculator Class

  // instantiate new calculator object
  const c = new Calculator();
})