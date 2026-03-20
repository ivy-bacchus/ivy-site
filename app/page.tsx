import { Dog } from 'lucide-react';
import Gallery from '@/components/Gallery';
import { photos } from '@/data/photos';

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto">
      {/* Header */}
      <header className="flex flex-col items-center pt-10 pb-6 px-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-bark-100 mb-4">
          <Dog size={32} className="text-bark-500" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-bark-600 leading-none">
          ivy
        </h1>
        <p className="mt-2 text-sm text-bark-400 tracking-widest uppercase">
          daily moments
        </p>
        <div className="mt-5 w-12 h-px bg-bark-200" />
      </header>

      {/* Gallery */}
      <section>
        <Gallery photos={photos} />
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-bark-300 text-xs">
        <p>made with love for ivy</p>
      </footer>
    </main>
  );
}
