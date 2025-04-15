import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PMU Sport - Activités sportives des collaborateurs',
  description: 'Plateforme de partage des activités sportives des collaborateurs du PMU',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-pmu-green text-white shadow-md">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center">
                  <Image 
                    src="/images/pmu-logo.png" 
                    alt="PMU Sport Logo" 
                    width={120} 
                    height={50}
                    className="mr-4"
                  />
                  <h1 className="text-2xl font-bold">PMU Sport</h1>
                </div>
                <nav className="mt-4 md:mt-0">
                  <ul className="flex space-x-6">
                    <li><a href="/" className="hover:underline">Accueil</a></li>
                    <li><a href="/activites" className="hover:underline">Activités</a></li>
                    <li><a href="/agenda" className="hover:underline">Agenda</a></li>
                    <li><a href="/proposer" className="hover:underline">Proposer une activité</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-100 border-t">
            <div className="container mx-auto px-4 py-6">
              <p className="text-center text-gray-600">© {new Date().getFullYear()} PMU Sport - Plateforme des activités sportives</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
