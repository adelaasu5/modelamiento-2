import React from 'react';
    import { CardFooter } from '@/components/ui/card';
    import { FileJson, Hash, TrendingUp, CheckCircle, Sigma } from 'lucide-react';

    export const ResultDisplay = ({ result }) => {
      const formatResult = (res) => {
        if (typeof res !== 'object' || res === null) {
          return <p className="text-xl sm:text-2xl font-bold text-pink-400 break-all">{String(res)}</p>;
        }
    
        return (
          <div className="space-y-2 sm:space-y-3 text-left w-full">
            {Object.entries(res).map(([key, value]) => {
              let label = key;
              let icon = <FileJson className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-400 flex-shrink-0" />;
              if (key === 'interpolatedValue') {
                label = 'Valor Interpolado';
                icon = <TrendingUp className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />;
              } else if (key === 'root') {
                label = 'Raíz Encontrada';
                icon = <CheckCircle className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />;
              } else if (key === 'iterations') {
                label = 'Iteraciones';
                icon = <Hash className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5 text-teal-400 flex-shrink-0" />;
              } else if (key === 'integralApproximation') {
                label = 'Aprox. Integral';
                icon = <Sigma className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0" />;
              }
    
              return (
                <div key={key} className="p-2 sm:p-3 bg-slate-800/70 rounded-md border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-1 sm:space-y-0">
                  <span className="text-slate-300 font-medium flex items-center text-sm sm:text-base">
                    {icon}
                    {label}:
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-pink-400 break-all pl-6 sm:pl-0">{String(value)}</span>
                </div>
              );
            })}
          </div>
        );
      };

      return (
        <CardFooter className="flex flex-col items-center justify-center bg-slate-700/50 p-4 sm:p-6 rounded-lg border border-slate-600 shadow-inner">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Resultado:</h3>
          <div className="w-full text-center">
            {formatResult(result)}
          </div>
        </CardFooter>
      );
    };