import { PawPrint, Heart, Camera, Home as HomeIcon, Images, Menu } from 'lucide-react';
import { photos } from '@/data/photos';
import PhotoStream from '@/components/PhotoStream';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const highlights = [
  { photo: photos[0],  label: '初めての日',  gradient: 'from-coral to-secondary-container' },
  { photo: photos[10], label: '冬のお散歩',  gradient: 'from-secondary-container to-tertiary-fixed' },
  { photo: photos[20], label: '春のIvy',    gradient: 'from-tertiary-fixed to-candy' },
  { photo: photos[35], label: '夏のIvy',    gradient: 'from-candy to-coral' },
];

export default function IvyPage() {
  const heroPhoto   = photos[photos.length - 1];
  const latestPhoto = photos[photos.length - 2];

  return (
    <>
      {/* ── Top Navigation ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#fff9ea]/70 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-screen-xl mx-auto">
          <span className="font-display text-2xl font-black text-primary">ivy</span>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-primary border-b-2 border-primary pb-1 font-display font-bold hover:scale-105 transition-transform" href="#">
              Daily Snaps
            </a>
            <a className="text-on-surface-variant hover:text-primary font-display font-bold hover:scale-105 transition-transform" href="#">
              成長アルバム
            </a>
            <a className="text-on-surface-variant hover:text-primary font-display font-bold hover:scale-105 transition-transform" href="#">
              お気に入り
            </a>
          </div>
          <PawPrint size={24} className="text-primary" />
        </div>
      </nav>

      <main className="pt-24 pb-28 md:pb-12">

        {/* ── Hero Section ── */}
        <section className="max-w-screen-xl mx-auto px-6 mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h1 className="font-display text-6xl md:text-8xl font-black text-primary leading-tight tracking-tight">
                ivy&apos;s <br />
                <span className="bg-gradient-to-r from-coral to-secondary-container bg-clip-text text-transparent">
                  World
                </span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-md mx-auto lg:mx-0 font-medium">
                大好きなポメラニアン ivy の、毎日のきらめく瞬間を集めました。
              </p>
              <div className="flex justify-center lg:justify-start">
                <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:animate-bounce-fun transition-all active:scale-95 flex items-center gap-2 shadow-lg hover:shadow-xl">
                  See Latest Moments
                  <Heart size={18} className="fill-on-primary stroke-on-primary" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-72 md:w-[26rem] md:h-[26rem]">
                <div className="absolute inset-0 bg-secondary-container/30 rounded-full blur-3xl -z-10 animate-pulse" />
                {/* Floating paw decorations */}
                <div className="absolute -top-5 -right-2 text-coral/70 animate-float z-10 pointer-events-none">
                  <PawPrint size={30} />
                </div>
                <div className="absolute -bottom-3 -left-7 text-secondary/50 animate-float-slow z-10 pointer-events-none" style={{ animationDelay: '1.4s' }}>
                  <PawPrint size={22} />
                </div>
                <div className="absolute top-1/3 -right-10 text-primary/25 animate-float z-10 pointer-events-none" style={{ animationDelay: '0.7s' }}>
                  <PawPrint size={16} />
                </div>
                {/* Photo count badge */}
                <div className="absolute -top-2 -left-4 bg-coral text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md rotate-[-12deg] z-20 pointer-events-none">
                  {photos.length}枚
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/photos/${encodeURIComponent(heroPhoto.filename)}`}
                  alt="ivyの写真"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-[10px] border-white/60"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Story Highlights ── */}
        <section className="max-w-screen-xl mx-auto px-6 mb-20">
          <div className="flex gap-8 md:gap-12 overflow-x-auto pb-4 no-scrollbar items-start justify-start md:justify-center">
            {highlights.map(({ photo, label, gradient }) => (
              <div key={photo.id} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div className={`w-24 h-24 rounded-full p-1 bg-gradient-to-tr ${gradient} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <div className="w-full h-full rounded-full border-4 border-surface overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE}/photos/${encodeURIComponent(photo.filename)}`}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-primary text-center">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Content Grid ── */}
        <section className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-8">

            {/* Ivy Stats */}
            <div className="bg-surface-container rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-black text-primary">Ivy&apos;s Stats</h3>
                <Camera size={24} className="text-secondary" />
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-on-surface-variant">
                    <span>写真の数</span>
                    <span className="text-primary">{photos.length} 枚</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-on-surface-variant">
                    <span>思い出の期間</span>
                    <span className="text-primary">6 ヶ月</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-fixed-dim rounded-full w-3/4" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm italic text-on-surface-variant">
                &ldquo;毎日が写真に残したい瞬間だらけ！&rdquo;
              </p>
            </div>

            {/* Latest Moment */}
            <div className="bg-secondary-container rounded-2xl p-6 overflow-hidden group">
              <h3 className="font-display text-xl font-black text-primary mb-1">Latest Moment</h3>
              <p className="text-on-secondary-container font-medium mb-4 text-sm">最新の ivy</p>
              <div className="aspect-square rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/photos/${encodeURIComponent(latestPhoto.filename)}`}
                  alt="最新のivyの写真"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

          </div>

          {/* Main Photo Stream */}
          <div className="md:col-span-8">
            <PhotoStream photos={photos} />
          </div>

        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-surface-container-low w-full py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-screen-xl mx-auto">
          <span className="font-display font-black text-primary text-xl">ivy</span>
          <span className="font-sans text-sm italic text-on-surface-variant">
            made with love for ivy
          </span>
          <div className="flex gap-6">
            <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm italic" href="#">
              Instagram
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors text-sm italic" href="#">
              家族専用
            </a>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#fff9ea]/90 backdrop-blur-lg px-6 py-4 flex justify-around items-center z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        <button className="flex flex-col items-center gap-1 text-primary">
          <HomeIcon size={22} />
          <span className="text-[10px] font-bold">ホーム</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <Images size={22} />
          <span className="text-[10px] font-bold">アルバム</span>
        </button>
        <div className="-mt-10 bg-secondary p-4 rounded-full shadow-lg">
          <Camera size={22} className="text-white" />
        </div>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <Heart size={22} />
          <span className="text-[10px] font-bold">お気に入り</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <Menu size={22} />
          <span className="text-[10px] font-bold">メニュー</span>
        </button>
      </nav>
    </>
  );
}
