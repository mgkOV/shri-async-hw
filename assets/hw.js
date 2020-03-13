const solveQuadraticEquationCb = (a, b, c, cb) => {
  const { add, multiply, subtract, less, equal, divide, sqrt } = window.Homework;
  // Находим дискриминант
  multiply(b, b, _b2 => {
    multiply(4, a, _4a => {
      multiply(_4a, c, _4ac => {
        subtract(_b2, _4ac, D => {
          less(D, 0, isLessThenZero => {
            if (isLessThenZero) {
              //Дискриминант меньше нуля
              return cb(NaN, NaN);
            }

            //Дискриминант больше или равен нулю
            equal(D, 0, isEqualToZero => {
              multiply(-1, b, _minusB => {
                multiply(2, a, _2a => {
                  //Дискриминант равен нулю
                  if (isEqualToZero) {
                    return divide(_minusB, _2a, roots => {
                      cb(roots, roots);
                    });
                  }

                  //Дискриминант больше нуля
                  sqrt(D, _rootOfD => {
                    add(_minusB, _rootOfD, _sum => {
                      subtract(_minusB, _rootOfD, _difference => {
                        //Первый корень
                        divide(_sum, _2a, root1 => {
                          //Второй корень
                          divide(_difference, _2a, root2 => {
                            cb(root1, root2);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

const solveQuadraticEquationP = (a, b, c, cb) => {
  let { add, multiply, subtract, less, equal, divide, sqrt } = window.Homework;

  const promisify = fn => (...args) =>
    new Promise(resolve => {
      fn.call(null, ...args, resolve);
    });

  add = promisify(add);
  multiply = promisify(multiply);
  subtract = promisify(subtract);
  less = promisify(less);
  equal = promisify(equal);
  divide = promisify(divide);
  sqrt = promisify(sqrt);

  const values = {};

  // Находим дискриминант
  multiply(b, b)
    .then(_b2 => (values._b2 = _b2))
    .then(() => multiply(4, a))
    .then(_4a => multiply(_4a, c))
    .then(_4ac => subtract(values._b2, _4ac))
    .then(D => (values.D = D))
    .then(() => less(values.D, 0))
    //Дискриминант меньше нуля
    .then(isLessThenZero => {
      if (isLessThenZero) {
        cb(NaN, NaN);
        return Promise.reject({ type: "canceled" });
      }
    })
    //Дискриминант больше или равен нулю
    .then(() => multiply(-1, b))
    .then(_minusB => (values._minusB = _minusB))
    .then(() => multiply(2, a))
    .then(_2a => (values._2a = _2a))
    .then(() => equal(values.D, 0))
    .then(isEqualToZero => {
      if (isEqualToZero) {
        return divide(values._minusB, values._2a);
      }
    })
    //Дискриминант равен нулю
    .then(roots => {
      if (roots === undefined) return;
      cb(roots, roots);
      return Promise.reject({ type: "canceled" });
    })
    // Дискриминант больше нуля
    .then(() => sqrt(values.D))
    .then(_sqrOfD => (values._sqrOfD = _sqrOfD))
    .then(() => add(values._minusB, values._sqrOfD))
    .then(sum => divide(sum, values._2a))
    .then(root1 => (values.root1 = root1))
    .then(() => subtract(values._minusB, values._sqrOfD))
    .then(difference => divide(difference, values._2a))
    .then(root2 => {
      cb(values.root1, root2);
    })
    .catch(err => {
      if (err.type !== "canceled") {
        console.log(err);
      }
    });
};
