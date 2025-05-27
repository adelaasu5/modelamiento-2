import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { Toaster } from '@/components/ui/toaster';
    import { useToast } from '@/components/ui/use-toast';
    import { Calculator, LineChart, Sigma, FunctionSquare, CheckCircle } from 'lucide-react';
    import { InputForm } from '@/components/InputForm';
    import { ResultDisplay } from '@/components/ResultDisplay';
    import { calculateNumericalMethod } from '@/lib/calculationService';

    const App = () => {
      const [selectedMethod, setSelectedMethod] = useState('');
      const [inputValues, setInputValues] = useState({});
      const [result, setResult] = useState(null);
      const [error, setError] = useState('');
      const { toast } = useToast();

      const handleCalculate = () => {
        setError('');
        setResult(null);

        if (!selectedMethod) {
          setError('Por favor, selecciona un método.');
          toast({
            title: 'Error de validación',
            description: 'Por favor, selecciona un método.',
            variant: 'destructive',
          });
          return;
        }

        try {
          const calculatedResult = calculateNumericalMethod(selectedMethod, inputValues);
          setResult(calculatedResult);
          toast({
            title: 'Cálculo Exitoso',
            description: `Se ha completado el cálculo para ${selectedMethod.replace(/-/g, ' ')}.`,
            action: <CheckCircle className="text-green-500" />,
          });
        } catch (e) {
          setError(e.message);
          toast({
            title: 'Error en el Cálculo',
            description: e.message,
            variant: 'destructive',
          });
        }
      };
      
      const handleMethodChange = (value) => {
        setSelectedMethod(value);
        setInputValues({}); 
        setResult(null);
        setError('');
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-purple-500 selection:text-white">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-slate-800/70 border-slate-700 shadow-2xl shadow-purple-500/30 backdrop-blur-md">
              <CardHeader className="text-center p-4 sm:p-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                  className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full w-fit shadow-lg"
                >
                  <Calculator size={36} smSize={48} className="text-white" />
                </motion.div>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                  Calculadora Numérica Avanzada
                </CardTitle>
                <CardDescription className="text-slate-400 text-base sm:text-lg mt-1 sm:mt-2">
                  Herramienta interactiva para métodos numéricos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 py-6 sm:py-8">
                <motion.div 
                  className="space-y-2 sm:space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Label htmlFor="method" className="text-lg sm:text-xl font-semibold text-slate-300 flex items-center">
                    <FunctionSquare className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                    Selecciona un Método
                  </Label>
                  <Select onValueChange={handleMethodChange} value={selectedMethod}>
                    <SelectTrigger id="method" className="w-full bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:ring-purple-500 text-base sm:text-lg py-3 sm:py-4 h-auto">
                      <SelectValue placeholder="Elige un método..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
                      <SelectItem value="interpolation" className="hover:bg-purple-500/20 focus:bg-purple-500/30 text-base sm:text-lg py-2 sm:py-3">
                        <div className="flex items-center">
                          <LineChart className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-pink-400" /> Interpolación
                        </div>
                      </SelectItem>
                      <SelectItem value="nonlinear" className="hover:bg-purple-500/20 focus:bg-purple-500/30 text-base sm:text-lg py-2 sm:py-3">
                        <div className="flex items-center">
                          <FunctionSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-400" /> Ecuaciones No Lineales
                        </div>
                      </SelectItem>
                      <SelectItem value="integration" className="hover:bg-purple-500/20 focus:bg-purple-500/30 text-base sm:text-lg py-2 sm:py-3">
                        <div className="flex items-center">
                          <Sigma className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-teal-400" /> Integración Numérica
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <AnimatePresence mode="wait">
                  {selectedMethod && (
                    <motion.div
                      key={selectedMethod}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InputForm
                        method={selectedMethod}
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {selectedMethod && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: selectedMethod ? 0.2 : 0.5, duration: 0.5 }}
                  >
                    <Button
                      onClick={handleCalculate}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 sm:py-5 text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 h-auto"
                      disabled={!selectedMethod}
                    >
                      <Calculator className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Calcular
                    </Button>
                  </motion.div>
                )}
              </CardContent>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 sm:px-6 pb-4 sm:pb-6"
                  >
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 sm:p-4 rounded-md text-center text-sm sm:text-base">
                      <p className="font-semibold">Error:</p>
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {result !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-6 pb-6 sm:pb-8"
                  >
                   <ResultDisplay result={result} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
             <footer className="text-center mt-6 sm:mt-8 text-slate-500 text-xs sm:text-sm">
              <p>&copy; {new Date().getFullYear()} Calculadora Numérica.</p>
            </footer>
          </motion.div>
          <Toaster />
        </div>
      );
    };

    export default App;