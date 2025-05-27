import { linearInterpolation, bisectionMethod, trapezoidalRule } from '@/lib/numericalMethods';

    export const calculateNumericalMethod = (method, inputValues) => {
      let calculatedResult;
      switch (method) {
        case 'interpolation':
          const { pointsX, pointsY, interpolateX } = inputValues;
          if (!pointsX || !pointsY || !interpolateX || pointsX.split(',').length !== pointsY.split(',').length || pointsX.split(',').length < 2) {
            throw new Error("Para interpolación, ingresa al menos dos pares de puntos (x,y) y un punto a interpolar. Asegúrate que haya la misma cantidad de X e Y.");
          }
          const xVals = pointsX.split(',').map(Number);
          const yVals = pointsY.split(',').map(Number);
          const xInter = Number(interpolateX);
          if (xVals.some(isNaN) || yVals.some(isNaN) || isNaN(xInter)) {
            throw new Error("Todos los valores de interpolación deben ser números.");
          }
          const points = xVals.reduce((acc, val, idx) => [...acc, val, yVals[idx]], []);
          calculatedResult = linearInterpolation(points, xInter);
          break;
        case 'nonlinear':
          const { nl_a, nl_b, nl_tol } = inputValues;
          if (nl_a === undefined || nl_b === undefined || nl_tol === undefined) {
             throw new Error("Para ecuaciones no lineales (método de bisección), ingresa el intervalo [a, b] y la tolerancia.");
          }
          const a = Number(nl_a);
          const b = Number(nl_b);
          const tol = Number(nl_tol);
          if (isNaN(a) || isNaN(b) || isNaN(tol)) {
            throw new Error("Los valores para el método de bisección deben ser números.");
          }
          const func = (x) => x*x*x - x - 2; // f(x) = x^3 - x - 2
          calculatedResult = bisectionMethod(func, a, b, tol);
          break;
        case 'integration':
          const { int_a, int_b, int_n } = inputValues;
           if (int_a === undefined || int_b === undefined || int_n === undefined) {
             throw new Error("Para integración numérica (regla del trapecio), ingresa el intervalo [a, b] y el número de subintervalos n.");
          }
          const ia = Number(int_a);
          const ib = Number(int_b);
          const nIntervals = parseInt(int_n);
          if (isNaN(ia) || isNaN(ib) || isNaN(nIntervals) || nIntervals <= 0) {
            throw new Error("Los valores para integración numérica deben ser números (n debe ser entero positivo).");
          }
          const integralFunc = (x) => x*x; // f(x) = x^2
          calculatedResult = trapezoidalRule(integralFunc, ia, ib, nIntervals);
          break;
        default:
          throw new Error('Método no válido seleccionado.');
      }
      return calculatedResult;
    };