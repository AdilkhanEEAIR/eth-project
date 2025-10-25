"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

interface DiplomaData {
  holderName: string;
  institution: string;
  degree: string;
  major: string;
  issueDate: bigint;
  graduationDate: bigint;
  ipfsHash: string;
  owner: string;
}

// Тип для ответа из контракта
type DiplomaResponse = [string, string, string, string, bigint, bigint, string, string];

export default function VerifyDiplomaPage() {
  const params = useParams();
  const tokenId = params.tokenId as string;
  const [diplomaData, setDiplomaData] = useState<DiplomaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Добавляем проверку на валидность tokenId
  const isValidTokenId = tokenId && !isNaN(Number(tokenId)) && Number(tokenId) > 0;

  // УБИРАЕМ enabled параметр
  const { data: diploma, isLoading: isReading } = useScaffoldContractRead<DiplomaResponse>({
    contractName: "EduChainDiploma",
    functionName: "getDiploma",
    args: isValidTokenId ? [BigInt(tokenId)] : undefined,
    // enabled: isValidTokenId, // УДАЛИТЬ ЭТУ СТРОКУ
  });

  useEffect(() => {
    // Самостоятельно обрабатываем enabled логику
    if (!isValidTokenId) {
      setIsLoading(false);
      return;
    }

    if (diploma && !isReading) {
      const [holderName, institution, degree, major, issueDate, graduationDate, ipfsHash, owner] = diploma;
      setDiplomaData({
        holderName,
        institution,
        degree,
        major,
        issueDate,
        graduationDate,
        ipfsHash,
        owner,
      });
      setIsLoading(false);
    } else if (!isReading && !diploma) {
      setIsLoading(false);
    }
  }, [diploma, isReading, isValidTokenId]);

  // ... остальной код без изменений ...
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Проверка диплома</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          <p className="mt-4">Загрузка данных диплома...</p>
        </div>
      </div>
    );
  }

  if (!isValidTokenId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Проверка диплома</h2>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md mx-auto">
            Неверный ID диплома. Пожалуйста, проверьте ссылку.
          </div>
        </div>
      </div>
    );
  }

  if (!diplomaData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Проверка диплома</h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            Диплом с ID {tokenId} не найден или не существует
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Проверка диплома</h2>
          <p className="text-gray-600">ID: {tokenId}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">✅ Диплом верифицирован</h3>
                <p className="opacity-90">Данные подтверждены блокчейном Status Network</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Владелец диплома</label>
                <p className="text-lg font-semibold">{diplomaData.holderName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Учебное заведение</label>
                <p className="text-lg font-semibold">{diplomaData.institution}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Степень</label>
                <p className="text-lg font-semibold">{diplomaData.degree}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Направление</label>
                <p className="text-lg font-semibold">{diplomaData.major}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Дата выпуска</label>
                <p className="text-lg font-semibold">
                  {new Date(Number(diplomaData.graduationDate) * 1000).toLocaleDateString("ru-RU")}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Дата регистрации</label>
                <p className="text-lg font-semibold">
                  {new Date(Number(diplomaData.issueDate) * 1000).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 border-t">
            <h4 className="font-semibold mb-4">Техническая информация</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-gray-500">Адрес владельца:</label>
                <code className="text-xs bg-gray-100 p-1 rounded break-all">{diplomaData.owner}</code>
              </div>
              <div>
                <label className="block text-gray-500">IPFS Hash:</label>
                <code className="text-xs bg-gray-100 p-1 rounded break-all">{diplomaData.ipfsHash}</code>
              </div>
              <div>
                <label className="block text-gray-500">ID диплома:</label>
                <code className="text-xs bg-gray-100 p-1 rounded">{tokenId}</code>
              </div>
              <div>
                <label className="block text-gray-500">Сеть:</label>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Status Network Sepolia</span>
              </div>
            </div>
          </div>

          {diplomaData.ipfsHash && (
            <div className="bg-blue-50 p-6 border-t">
              <div className="text-center">
                <a
                  href={`https://ipfs.io/ipfs/${diplomaData.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
                >
                  <span>📄</span>
                  <span className="ml-2">Посмотреть оригинал документа</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
