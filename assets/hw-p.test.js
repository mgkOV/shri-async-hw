import { solveQuadraticEquationP } from "./hw-p";

describe("solveQuadraticEquation реализация через Promise", () => {
  jest.setTimeout(3000);

  describe("Дискриминант больше нуля", () => {
    test("a = 1; b = 1; c = -6", done => {
      solveQuadraticEquationP(1, 1, -6, (root1, root2) => {
        expect(root1).toEqual(2);
        expect(root2).toEqual(-3);

        done();
      });
    });

    test("a = 1, b = 0, с = -4", done => {
      solveQuadraticEquationP(1, 0, -4, (root1, root2) => {
        expect(root1).toEqual(2);
        expect(root2).toEqual(-2);
        done();
      });
    });

    test("a = 2, b = 4, с = 0", done => {
      solveQuadraticEquationP(2, 4, 0, (root1, root2) => {
        expect(root1).toEqual(0);
        expect(root2).toEqual(-2);
        done();
      });
    });
  });

  describe("Дискриминант равен нулю", () => {
    test("a = 2, b = 4, с = 2", done => {
      solveQuadraticEquationP(2, 4, 2, (root1, root2) => {
        expect(root1).toEqual(-1);
        expect(root2).toEqual(-1);
        done();
      });
    });
  });

  describe("Дискриминант меньше нуля", () => {
    test("a = 1, b = 2, с = 2", done => {
      solveQuadraticEquationP(1, 2, 2, (root1, root2) => {
        expect(root1).toBeNaN();
        expect(root2).toBeNaN();
        done();
      });
    });
  });
});
