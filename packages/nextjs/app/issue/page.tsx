"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";

export default function IssueDiplomaPage() {
  const { isConnected } = useAccount(); // Убираем address так как он не используется
  const [formData, setFormData] = useState({
    recipient: "",
    holderName: "",
    institution: "",
    degree: "",
    major: "",
    graduationDate: "",
    ipfsHash: "",
  });

  const { writeContractAsync, isMining } = useScaffoldContractWrite({
    contractName: "EduChainDiploma",
    functionName: "issueDiploma",
    args: [
      formData.recipient as `0x${string}`,
      formData.holderName,
      formData.institution,
      formData.degree,
      formData.major,
      formData.graduationDate ? Math.floor(new Date(formData.graduationDate).getTime() / 1000) : 0,
      formData.ipfsHash,
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      alert("Пожалуйста, подключите кошелек");
      return;
    }

    try {
      const result = await writeContractAsync();
      console.log("Diploma issued successfully:", result);
      alert("Диплом успешно выпущен! Транзакция gasless.");

      // Очищаем форму
      setFormData({
        recipient: "",
        holderName: "",
        institution: "",
        degree: "",
        major: "",
        graduationDate: "",
        ipfsHash: "",
      });
    } catch (error) {
      console.error("Failed to issue diploma:", error);
      alert("Ошибка при выпуске диплома");
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Выпуск дипломов</h2>
          <p className="text-gray-600">Пожалуйста, подключите кошелек для доступа к этой функции</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Выпуск диплома</h2>

        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>✅ Все транзакции на этой странице полностью бесплатны (gasless)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Адрес получателя *</label>
              <input
                type="text"
                required
                value={formData.recipient}
                onChange={e => setFormData({ ...formData, recipient: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0x..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ФИО студента *</label>
              <input
                type="text"
                required
                value={formData.holderName}
                onChange={e => setFormData({ ...formData, holderName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Иванов Иван Иванович"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Учебное заведение *</label>
            <input
              type="text"
              required
              value={formData.institution}
              onChange={e => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Национальный исследовательский университет ИТМО"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Степень/Квалификация *</label>
              <select
                required
                value={formData.degree}
                onChange={e => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Выберите степень</option>
                <option value="Бакалавр">Бакалавр</option>
                <option value="Специалист">Специалист</option>
                <option value="Магистр">Магистр</option>
                <option value="Аспирант">Аспирант</option>
                <option value="Сертификат">Сертификат</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Направление/Специальность *</label>
              <input
                type="text"
                required
                value={formData.major}
                onChange={e => setFormData({ ...formData, major: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Информатика и вычислительная техника"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Дата выпуска *</label>
            <input
              type="date"
              required
              value={formData.graduationDate}
              onChange={e => setFormData({ ...formData, graduationDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IPFS Hash документа *</label>
            <input
              type="text"
              required
              value={formData.ipfsHash}
              onChange={e => setFormData({ ...formData, ipfsHash: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="QmXYZ..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Загрузите PDF диплома в IPFS (используйте Pinata, Lighthouse или другой сервис)
            </p>
          </div>

          <button
            type="submit"
            disabled={isMining}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-md font-semibold transition-colors"
          >
            {isMining ? "Выпуск диплома..." : "Выпустить диплом (Gasless)"}
          </button>
        </form>
      </div>
    </div>
  );
}
