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
  const c = new Calculator(),
    sign = $('.sign');

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

  })//= End Number Pad

  // operand clicked
  $('.operator').on('click', function () {
    // prevent two operands being clicked next to each other
    if (isNaN(c.lastValueEntered())) return;

    c.chain = $(this).text();

    c.displayOutput(c.current, c.chain);

  })//= End Operator Pad

  // equals clicked
  $('.total').on('click', () => {
    let sum = c.chain;
    // replace x with * for eval
    sum = sum.replace(/x/g, '*');
    // eval sum and if whole number remove trailing 00's
    sum = eval(sum).toFixed(2).replace(/\.00$/, '');
    // reset and replace chain with current sum
    c._chain = [];
    c.chain = sum;
    c.displayOutput(sum, sum);

  })//= End Equal Button

  // handle negative numbers
  sign.on('click', () => {

    // make sure we have a number
    if (c._chain.length === 0) return;

    let current = c.current;
    // get last items of chain depending on current length
    let chain = c.sign(current.length);

    c._current = [];

    if (sign.hasClass('negative')) {
      sign.removeClass('negative');
      // remove negative sign
      c.chain = chain.substr(1);
      c.current = current.substr(1);
    } else {
      sign.addClass('negative');
      // add negative sign
      c.chain = '-' + chain;
      c.current = '-' + current;
    }
    c.displayOutput(c.current, c.chain);
  })//= End Negative numbers

  // clear all
  $('.allClear').on('click', () => {
    sign.removeClass('negative');
    c._chain = [];
    c._current = [];
    c.displayOutput();
  })//= End Clear all
})