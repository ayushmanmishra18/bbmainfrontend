import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        Welcome to Bloodbankgroup.com
      </h1>
      <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-400">
        The modern blood bank management system.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link href="/login" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors text-center">
          Admin Login
        </Link>
        <Link href="/login/donor" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors text-center">
          Donor Login
        </Link>
        <Link href="/register" className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors text-center">
          Register Blood Bank
        </Link>
      </div>
    </main>
  );
}