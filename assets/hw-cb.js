import "./api";

const { add, multiply, subtract, less, equal, divide, sqrt } = window.Homework;

export const solveQuadraticEquationCb = (a, b, c, cb) => {
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
