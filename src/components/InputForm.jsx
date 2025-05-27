import React from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';

    export const InputForm = ({ method, inputValues, setInputValues }) => {
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prev => ({ ...prev, [name]: value }));
      };

      const commonInputClass = "w-full bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:ring-purple-500 text-sm sm:text-base py-2 sm:py-3 h-auto";
      const labelClass = "text-slate-300 text-sm sm:text-base";
      const fieldDescriptionClass = "text-xs text-slate-500";

      const getMethodDisplayName = () => {
        switch(method) {
          case 'interpolation': return 'Interpolación';
          case 'nonlinear': return 'Ecuaciones No Lineales';
          case 'integration': return 'Integración Numérica';
          default: return '';
        }
      };

      const renderFields = () => {
        switch (method) {
          case 'interpolation':
            return (
              <>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="pointsX" className={labelClass}>Puntos X (separados por coma)</Label>
                  <Input id="pointsX" name="pointsX" type="text" placeholder="Ej: 1,2,3" value={inputValues.pointsX || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="pointsY" className={labelClass}>Puntos Y (separados por coma)</Label>
                  <Input id="pointsY" name="pointsY" type="text" placeholder="Ej: 10,15,20" value={inputValues.pointsY || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="interpolateX" className={labelClass}>Valor de X a interpolar</Label>
                  <Input id="interpolateX" name="interpolateX" type="number" placeholder="Ej: 2.5" value={inputValues.interpolateX || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                <p className={fieldDescriptionClass}>Asegúrate de que haya la misma cantidad de puntos X e Y, y al menos dos pares.</p>
              </>
            );
          case 'nonlinear':
            return (
              <>
                <p className="text-sm text-slate-400 mb-1 sm:mb-2">Función de ejemplo: f(x) = x³ - x - 2</p>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="nl_a" className={labelClass}>Límite inferior del intervalo (a)</Label>
                  <Input id="nl_a" name="nl_a" type="number" placeholder="Ej: 1" value={inputValues.nl_a || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="nl_b" className={labelClass}>Límite superior del intervalo (b)</Label>
                  <Input id="nl_b" name="nl_b" type="number" placeholder="Ej: 2" value={inputValues.nl_b || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="nl_tol" className={labelClass}>Tolerancia</Label>
                  <Input id="nl_tol" name="nl_tol" type="number" placeholder="Ej: 0.00001" step="0.00001" value={inputValues.nl_tol || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                 <p className={fieldDescriptionClass}>El método de bisección encontrará una raíz de la función en el intervalo [a, b].</p>
              </>
            );
          case 'integration':
            return (
              <>
                <p className="text-sm text-slate-400 mb-1 sm:mb-2">Función de ejemplo: f(x) = x²</p>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="int_a" className={labelClass}>Límite inferior de integración (a)</Label>
                  <Input id="int_a" name="int_a" type="number" placeholder="Ej: 0" value={inputValues.int_a || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="int_b" className={labelClass}>Límite superior de integración (b)</Label>
                  <Input id="int_b" name="int_b" type="number" placeholder="Ej: 1" value={inputValues.int_b || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="int_n" className={labelClass}>Número de subintervalos (n)</Label>
                  <Input id="int_n" name="int_n" type="number" placeholder="Ej: 100" min="1" step="1" value={inputValues.int_n || ''} onChange={handleInputChange} className={commonInputClass} />
                </div>
                <p className={fieldDescriptionClass}>La regla del trapecio calculará el área aproximada bajo la curva.</p>
              </>
            );
          default:
            return <p className="text-slate-400">Selecciona un método para ver los campos de entrada.</p>;
        }
      };

      return (
        <motion.div 
          className="space-y-3 sm:space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Label className="text-lg sm:text-xl font-semibold text-slate-300">
            Ingresa los Datos para "{getMethodDisplayName()}"
          </Label>
          {renderFields()}
        </motion.div>
      );
    };