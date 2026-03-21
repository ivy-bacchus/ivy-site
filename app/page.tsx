import { PawPrint } from 'lucide-react';
import Gallery from '@/components/Gallery';
import { photos } from '@/data/photos';

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto">
      {/* Header */}
      <header className="flex flex-col items-center pt-12 pb-8 px-4">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-bark-100 mb-5 shadow-sm">
          <PawPrint size={36} className="text-bark-500" />
        </div>
        <h1 className="font-display text-6xl font-extrabold tracking-tight text-bark-600 leading-none">
          ivy
        </h1>
        <p className="mt-2 text-xs text-bark-400 tracking-[0.25em] uppercase font-medium">
          daily moments
        </p>
        <div className="mt-6 w-10 h-0.5 bg-bark-200 rounded-full" />
      </header>

      {/* Gallery */}
      <section className="pb-4">
        <Gallery photos={photos} />
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-bark-300 text-xs font-medium tracking-wide">
        <p>made with love for ivy</p>
      </footer>
    </main>
  );
}
