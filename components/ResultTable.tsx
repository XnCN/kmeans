import React, { useEffect, useState } from "react";
import { Table, TableColumnProps } from "@arco-design/web-react";
import IIteration from "../src/interfaces/IIteration";
import IIterationResult from "../src/interfaces/IIterationResult";

type Props = {
  iteration: IIteration;
  iterationResult: IIterationResult;
};

export default function ResultTable({ iteration, iterationResult }: Props) {
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<TableColumnProps[]>();

  useEffect(() => {
    const clusters = iteration.clusters.map((cluster, index) => {
      return {
        title: `Cluster${index + 1}`,
        dataIndex: `c${index}`,
      };
    });
    const distances = iteration.clusters.map((cluster, index) => {
      return {
        title: `Distance${index + 1}`,
        dataIndex: `d${index}`,
      };
    });

    const columns: TableColumnProps[] = [
      {
        title: "Xi",
        dataIndex: "xi",
      },
      ...clusters,
      ...distances,
      {
        title: "NearestCluster",
        dataIndex: "ni",
      },
    ];
    let clusterData: any = [];
    iteration.clusters.forEach((cluster, index) => {
      clusterData[`c${index}`] = cluster;
    });

    const data = iteration.calculations.map((calculation, index) => {
      let distanceData: any = [];
      calculation.distances.forEach((distance, index) => {
        distanceData[`d${index}`] = distance;
      });
      return {
        key: index,
        xi: calculation.item,
        ...clusterData,
        ...distanceData,
        ni: calculation.nearestCluster,
      };
    });
    setColumns(columns);
    setData(data);
  }, []);

  return <Table className={"mb-5"} columns={columns} data={data} />;
}
