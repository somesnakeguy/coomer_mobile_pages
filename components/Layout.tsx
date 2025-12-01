import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex gap-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          {/* <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/services" className="hover:text-gray-300">Services</Link> */}
          {/* Add more navigation links based on your markdown files */}
        </nav>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          © {new Date().getFullYear()} Your Site Name
        </div>
      </footer>
    </div>
  );
}