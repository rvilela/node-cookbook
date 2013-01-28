var Calc = function() {
  this.x = 5;
  this.addX = function(value) {
    return value + this.x;
  };
};
module.exports = Calc;
