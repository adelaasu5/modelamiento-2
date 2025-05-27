
    export const linearInterpolation = (points, x) => {
      if (points.length < 4 || points.length % 2 !== 0) {
        throw new Error("Se necesitan al menos dos puntos (cuatro valores) para la interpolación lineal.");
      }
      let x1, y1, x2, y2;
      for (let i = 0; i < points.length - 2; i += 2) {
        if ((points[i] <= x && points[i+2] >= x) || (points[i] >= x && points[i+2] <= x) ) {
          x1 = points[i];
          y1 = points[i+1];
          x2 = points[i+2];
          y2 = points[i+3];
          break;
        }
      }
      if (x1 === undefined) {
          if (x < points[0]) {
              x1 = points[0]; y1 = points[1];
              x2 = points[2]; y2 = points[3];
          } else {
              x1 = points[points.length - 4]; y1 = points[points.length - 3];
              x2 = points[points.length - 2]; y2 = points[points.length - 1];
          }
      }
      if (x2 - x1 === 0) return y1; 
      const result = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
      return { interpolatedValue: result.toFixed(5) };
    };
    
    export const bisectionMethod = (func, a, b, tol = 1e-5, maxIter = 100) => {
      if (func(a) * func(b) >= 0) {
        throw new Error("La función debe tener signos opuestos en los puntos a y b para el método de bisección.");
      }
      let c = a;
      let iter = 0;
      while ((b - a) >= tol && iter < maxIter) {
        c = (a + b) / 2;
        if (func(c) === 0.0) break;
        else if (func(c) * func(a) < 0) b = c;
        else a = c;
        iter++;
      }
      return { root: c.toFixed(5), iterations: iter };
    };
    
    export const trapezoidalRule = (func, a, b, n) => {
      if (n <= 0) throw new Error("El número de subintervalos (n) debe ser un entero positivo.");
      if (isNaN(n)) throw new Error("El número de subintervalos (n) debe ser un número.");
      const h = (b - a) / n;
      let sum = 0.5 * (func(a) + func(b));
      for (let i = 1; i < n; i++) {
        sum += func(a + i * h);
      }
      return { integralApproximation: (h * sum).toFixed(5) };
    };
    