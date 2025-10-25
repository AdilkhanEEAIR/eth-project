"use client";

import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth/useDeployedContractInfo";

export const useScaffoldContractWrite = ({
  contractName,
  functionName,
  args,
}: {
  contractName: string;
  functionName: string;
  args?: any[];
}) => {
  const { data: deployedContract } = useDeployedContractInfo(contractName);
  const [isMining, setIsMining] = useState(false);
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const writeContractAsync = async () => {
    if (!deployedContract || !walletClient || !address) {
      throw new Error("Contract or wallet not ready");
    }

    try {
      setIsMining(true);

      const hash = await walletClient.writeContract({
        address: deployedContract.address,
        abi: deployedContract.abi,
        functionName,
        args,
        account: address,
      } as any);

      // Ждем подтверждения транзакции
      const receipt = await publicClient?.waitForTransactionReceipt({ hash });
      return receipt;
    } catch (error) {
      console.error("Contract write error:", error);
      throw error;
    } finally {
      setIsMining(false);
    }
  };

  return {
    writeContractAsync,
    isMining,
  };
};
