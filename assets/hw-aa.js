import "./api";

export const solveQuadraticEquationA = (a, b, c, cb) => {
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

  (async () => {
    try {
      // Находим дискриминант
      const _b2 = await multiply(b, b);
      const _4a = await multiply(4, a);
      const _4ac = await multiply(_4a, c);
      const D = await subtract(_b2, _4ac);
      const isLessThenZero = await less(D, 0);

      //Дискриминант меньше нуля
      if (isLessThenZero) {
        return cb(NaN, NaN);
      }

      const _minusB = await multiply(-1, b);
      const _2a = await multiply(2, a);
      const isEqualToZero = await equal(D, 0);

      //Дискриминант равен нулю
      if (isEqualToZero) {
        const roots = await divide(_minusB, _2a);
        return cb(roots, roots);
      }

      const _sqrOfD = await sqrt(D);
      const sum = await add(_minusB, _sqrOfD);
      const root1 = await divide(sum, _2a);
      const difference = await subtract(_minusB, _sqrOfD);
      const root2 = await divide(difference, _2a);
      //Дискриминант больше нуля
      cb(root1, root2);
    } catch (error) {
      console.log(error);
    }
  })();
};
