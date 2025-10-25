"use client";

import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth/useDeployedContractInfo";

// Упрощаем типы - убираем зависимость от несуществующих типов
export const useScaffoldContractRead = <T>({
  contractName,
  functionName,
  args,
  enabled = true,
}: {
  contractName: string; // Просто string вместо ContractName
  functionName: string;
  args?: any[];
  enabled?: boolean;
}) => {
  const { data: deployedContractData, isLoading: isContractLoading } = useDeployedContractInfo(contractName);
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useAccount();
  const publicClient = usePublicClient();

  useEffect(() => {
    const readContract = async () => {
      if (!enabled || !deployedContractData || !publicClient) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const result = await publicClient.readContract({
          address: deployedContractData.address,
          abi: deployedContractData.abi,
          functionName,
          args,
          account: address,
        } as any);
        setData(result as T);
      } catch (error) {
        console.error(`Error reading contract ${contractName} function ${functionName}:`, error);
        setData(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    readContract();
  }, [contractName, functionName, args, enabled, deployedContractData, publicClient, address]);

  return {
    data,
    isLoading: isLoading || isContractLoading,
  };
};
