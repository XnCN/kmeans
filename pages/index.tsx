import { useState, useRef, useEffect } from "react";
import { Steps, Button, Divider } from "@arco-design/web-react";
const Step = Steps.Step;
import {
  calculateIteration,
  calculateIterationResult,
} from "../src/calculation/Calculator";
import IIteration from "../src/interfaces/IIteration";
import FormComponent from "../components/FormComponent";
import ResultTable from "../components/ResultTable";
import IResult from "../src/interfaces/IResult";
export default function Home() {
  const numbersFormRef = useRef<any>();
  const clustersFormRef = useRef<any>();
  const [current, setCurrent] = useState(1);
  const [clusters, setClusters] = useState<number[]>([16, 22]);
  const [results, setResults] = useState<IResult[]>([]);
  const [needRun, setNeedRun] = useState(true);
  const [numbers, setNumbers] = useState<number[]>([
    15, 15, 16, 19, 19, 20, 20, 21, 22, 28, 35, 40, 41, 42, 43, 44, 60, 61, 65,
  ]);

  function calculate(step: number, numbers: number[], clusters: number[]) {
    const iteration: IIteration = {
      step,
      clusters,
      calculations: [],
    };
    calculateIteration(numbers, iteration);
    const iterationResult = calculateIterationResult(iteration);
    const lastResult = results[results.length - 1];
    if (lastResult) {
      const needStop =
        lastResult.iterationResult.centroids.sort().toString() ==
        iterationResult.centroids.sort().toString();
      setNeedRun(!needStop);
    }
    setResults([...results, { iteration, iterationResult }]);
  }

  function numbersSubmitHandler(values: any) {
    setNumbers(values.numbers.map((n: string) => parseInt(n)));
    setCurrent(2);
  }

  function clustersSubmitHandler(values: any) {
    setClusters(values.numbers.map((n: string) => parseInt(n)));
    setCurrent(3);
  }

  useEffect(() => {
    if (results.length == 0 && needRun) calculate(1, numbers, clusters);
    if (results.length == 0 || needRun == false) return;
    const lastResult = results[results.length - 1];
    calculate(results.length, numbers, lastResult.iterationResult.centroids);
  }, [results]);

  useEffect(() => {
    if (current == 3) startCalculation();
  }, [current]);

  function startCalculation() {
    setResults([]);
    setNeedRun(true);
  }

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="rounded-lg bg-gray-300 backdrop-blur-2xl p-5 w-3/5 ">
        <Steps current={current} onChange={setCurrent}>
          <Step title="Veriler" description="Veri kumesini giriniz" />
          <Step title="Kumeler" description="Kumeleri belirleyin" />
          <Step title="Sonuclar" description="Sonuclari gozlemleyin" />
        </Steps>
        <Divider className={"shadow-xl"} />
        <div className="h-96 max-h-96 overflow-y-auto">
          {current == 1 && (
            <FormComponent
              formRef={numbersFormRef}
              initialValues={numbers}
              onSubmitHandler={numbersSubmitHandler}
              placeHolder="Sayilar"
            />
          )}
          {current == 2 && (
            <FormComponent
              formRef={clustersFormRef}
              initialValues={clusters}
              onSubmitHandler={clustersSubmitHandler}
              placeHolder="Kumeler"
            />
          )}

          {current == 3 &&
            results.map(({ iteration, iterationResult }) => (
              <ResultTable
                iteration={iteration}
                iterationResult={iterationResult}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
