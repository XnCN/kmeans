import ICalculation from "./ICalculation";

export default interface IIteration {
  step: number;
  clusters: number[];
  calculations: ICalculation[];
}
