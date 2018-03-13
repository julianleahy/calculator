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

    // return last value in chain or 0 if empty
    lastValueEntered() {
      return (this._chain.length > 0) ? this._chain[this._chain.length - 1] : 0;
    }
  } //= End Calculator Class

  // instantiate new calculator object
  const c = new Calculator();

  // number pad clicked
  $('.numerical').on('click', function () {
    // if last value in chain is an operator clear the current array ready to display next number/s
    if (isNaN(c.lastValueEntered()) && c.lastValueEntered() != '.') c._current = [];

    // get value of pressed button
    const numb = $(this).text();

    // prevent multiple 0's at beginning
    if (numb === '0' && c._chain.length === 0) return;

    // check number only has one period
    if (numb === '.' && c.current.includes('.')) return;

    // update arrays
    c.current = numb;
    c.chain = numb;

    c.displayOutput(c.current, c.chain);

  })
})