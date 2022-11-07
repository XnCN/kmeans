import ICalculation from "../interfaces/ICalculation";
import IIteration from "../interfaces/IIteration";
import IIterationResult from "../interfaces/IIterationResult";

export function calculateIterationResult(
  iteration: IIteration
): IIterationResult {
  const results = iteration.clusters.map((cluster, index) => {
    const numbers = iteration.calculations
      .filter((calculation) => calculation.nearestCluster == index)
      .map((calculation) => calculation.item);
    return +(numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2);
  });
  return { centroids: results } as IIterationResult;
}

export function calculateNearestCluster(distances: number[]): number {
  const sameNumbers = distances.filter(
    (distance, index) => distances.indexOf(distance) != index
  );
  return sameNumbers.length == 0
    ? distances.findIndex((distance) => distance == Math.min(...distances))
    : distances.lastIndexOf(sameNumbers[sameNumbers.length - 1]);
}

export function calculateIteration(numbers: number[], iteration: IIteration) {
  numbers.forEach((number) => {
    const distances: number[] = iteration.clusters.map((clusterValue) =>
      Math.abs(clusterValue - number)
    );
    const nearestCluster: number = calculateNearestCluster(distances);
    const calculation: ICalculation = {
      item: number,
      distances,
      nearestCluster,
    };
    iteration.calculations.push(calculation);
  });
}
