import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">EduChain Verifier</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Децентрализованная система верификации дипломов и сертификатов. Бесплатный выпуск и мгновенная проверка на
            блокчейне Status Network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/issue"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Выпустить диплом
            </Link>
            <Link
              href="/verify"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Проверить диплом
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-600 text-2xl mb-4">🚀</div>
              <h3 className="font-semibold text-lg mb-2">Gasless транзакции</h3>
              <p className="text-gray-600">Выпускайте дипломы бесплатно на Status Network</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-green-600 text-2xl mb-4">🔍</div>
              <h3 className="font-semibold text-lg mb-2">Мгновенная проверка</h3>
              <p className="text-gray-600">Проверяйте подлинность без кошелька и регистрации</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-purple-600 text-2xl mb-4">🛡️</div>
              <h3 className="font-semibold text-lg mb-2">Безопасно</h3>
              <p className="text-gray-600">Данные защищены блокчейном и не могут быть подделаны</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
