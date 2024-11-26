import Link from 'next/link';

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
    <div className="text-center">
        <h1 className="text-9xl font-extrabold text-greenText">404</h1>
        <p className="text-2xl md:text-3xl font-bold mt-4 text-white">
            Oops! Page not found.
        </p>
        <p className="text-white mt-2">
            The page you’re looking for doesn’t exist.
        </p>
        <Link href="/" className="mt-6 inline-block px-6 py-3 text-white bg-darkGreen hover:bg-greenText rounded-lg shadow-md transition-all">
            Go Back Home
        </Link>
    </div>
</div>
  );
}
