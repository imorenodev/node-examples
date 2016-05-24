module.exports = function (x, y, cb) {
  try {
    if (x < 0 || y < 0) {
      throw new Error('Rectangle dimensions should be greater than zero: l  = ' + x + ', and b = ' + y);
    } else {
      cb(null, {
        perimeter: function() {
          return (2 * (x + y));
        },
        area: function() {
          return x * y;
        }
      });
    }
  } catch (error) {
    cb(error, null);
  }
};
