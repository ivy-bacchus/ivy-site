export interface Photo {
  id: string;
  filename: string;
  date: string; // ISO date for sorting
}

export const photos: Photo[] = [
  { id: 'p01', filename: '20250126_145755.jpg', date: '2025-01-26' },
  { id: 'p02', filename: '20250126_145805.jpg', date: '2025-01-26' },
  { id: 'p03', filename: '20250127_114803.jpg', date: '2025-01-27' },
  { id: 'p04', filename: '20250128_190953.jpg', date: '2025-01-28' },
  { id: 'p05', filename: '20250205_230604.jpg', date: '2025-02-05' },
  { id: 'p06', filename: '20250205_230607.jpg', date: '2025-02-05' },
  { id: 'p07', filename: '20250207_195036.jpg', date: '2025-02-07' },
  { id: 'p08', filename: '20250209_172007_0.jpg', date: '2025-02-09' },
  { id: 'p09', filename: '1740058124553.jpg', date: '2025-02-20' },
  { id: 'p10', filename: '1740058127599.jpg', date: '2025-02-20' },
  { id: 'p11', filename: '1740058150381.jpg', date: '2025-02-20' },
  { id: 'p12', filename: '1740058156323.jpg', date: '2025-02-20' },
  { id: 'p13', filename: '1740058202607.jpg', date: '2025-02-20' },
  { id: 'p14', filename: '1740058203683.jpg', date: '2025-02-20' },
  { id: 'p15', filename: '1740058205555.jpg', date: '2025-02-20' },
  { id: 'p16', filename: '1740058206808.jpg', date: '2025-02-20' },
  { id: 'p17', filename: '1740058208921.jpg', date: '2025-02-20' },
  { id: 'p18', filename: '1740058210434.jpg', date: '2025-02-20' },
  { id: 'p19', filename: '1740058211948.jpg', date: '2025-02-20' },
  { id: 'p20', filename: '20250301_091004.jpg', date: '2025-03-01' },
  { id: 'p21', filename: '1742027253556.jpg', date: '2025-03-15' },
  { id: 'p22', filename: '20250316_165927.jpg', date: '2025-03-16' },
  { id: 'p23', filename: '20250317_193227.jpg', date: '2025-03-17' },
  { id: 'p24', filename: '20250322_164046.jpg', date: '2025-03-22' },
  { id: 'p25', filename: '20250329_084822.jpg', date: '2025-03-29' },
  { id: 'p26', filename: '20250401_184748.jpg', date: '2025-04-01' },
  { id: 'p27', filename: '20250402_112219.jpg', date: '2025-04-02' },
  { id: 'p28', filename: '20250404_145145.jpg', date: '2025-04-04' },
  { id: 'p29', filename: '1743826706457.jpg', date: '2025-04-05' },
  { id: 'p30', filename: '20250409_150416.jpg', date: '2025-04-09' },
  { id: 'p31', filename: '20250409_150537.jpg', date: '2025-04-09' },
  { id: 'p32', filename: '20250409_220151.jpg', date: '2025-04-09' },
  { id: 'p33', filename: '20250409_220200.jpg', date: '2025-04-09' },
  { id: 'p34', filename: '20250411_162103.jpg', date: '2025-04-11' },
  { id: 'p35', filename: '20250411_163653.jpg', date: '2025-04-11' },
  { id: 'p36', filename: '1752984136805.jpg', date: '2025-07-20' },
  { id: 'p37', filename: '1752984148352.jpg', date: '2025-07-20' },
  { id: 'p38', filename: '1752984190608.jpg', date: '2025-07-20' },
  { id: 'p39', filename: '1752984204985.jpg', date: '2025-07-20' },
  { id: 'p40', filename: '1752984236445.jpg', date: '2025-07-20' },
];

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${year}年${parseInt(month)}月${parseInt(day)}日`;
}
