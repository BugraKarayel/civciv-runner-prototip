// Kapsamlı Türkçe, İngilizce ve Hibrit (Harf + Rakam + Sembol) Küfür ve Argo Filtresi

const BANNED_PATTERNS = [
  // Cinsel & Argo
  'sex', 'seks', 'sxs', 'sakso', 'saxo', 'anal', 'oral', 'dildo', 'vagina', 'penis', 'vajina', 'meme',
  'porno', 'porn', 'xxx',

  // Türkçe Küfür ve Hakaretler
  'amk', 'amq', 'aq', 'sik', 'siki', 'sikt', 'sike', 'siko', 'sokuk', 'sokayim', 'sokam', 'sikik', 'sikis',
  'yarrak', 'yarak', 'yarrk', 'yark', 'yarram', 'yarragim',
  'orospu', 'orosp', 'orspu', 'oc', 'oç',
  'pic', 'piç',
  'got', 'göt', 'gotlek', 'götoş',
  'ibne', 'pust', 'puşt',
  'kahpe', 'kasar', 'kaşar',
  'dalyarak', 'dalyarrak',
  'tasak', 'taşak', 'dassak', 'daşşak',
  'amcik', 'amcık',
  'pezevenk', 'pezeveng', 'gavat', 'kavat',
  'ebeni', 'ebenin', 'anani', 'ananı', 'bacini', 'bacını', 'sulaleni', 'sülaleni',
  'yavsak', 'yavşak',

  // İngilizce Küfürler & Slurs
  'fuck', 'fuk', 'fck', 'bitch', 'btch',
  'dick', 'pussy', 'cunt', 'cock', 'whore', 'slut',
  'fag', 'faggot', 'nigger', 'nigga'
];

// Masum Türkçe kelimeler (içinde 'sik' vb. geçenler)
const WHITELIST = [
  'klasik', 'eksik', 'kesik', 'fizik', 'muzik', 'baki', 'burak'
];

export const ProfanityFilter = {
  // Karışık yazımları (leetspeak, semboller, x/ks dönüşümleri) normalize eder
  getVariants(input) {
    if (!input || !input.trim()) return [];
    
    let raw = input.toLowerCase().trim();

    // Türkçe karakterleri eşleştir
    const tr = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'i': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
    let base = raw.replace(/[çğıöşü]/g, c => tr[c] || c);

    // 1. Leetspeak dönüşümü (sayı ve sembolleri harflere çevir)
    let leet = base
      .replace(/0/g, 'o')
      .replace(/1/g, 'i')
      .replace(/3/g, 'e')
      .replace(/4/g, 'a')
      .replace(/@/g, 'a')
      .replace(/\$/g, 's')
      .replace(/5/g, 's')
      .replace(/7/g, 't')
      .replace(/8/g, 'b')
      .replace(/!/g, 'i');

    // 2. Sayıları tamamen silinmiş hali (örn: sex123 -> sex, amk99 -> amk)
    let noNums = leet.replace(/[0-9]/g, '');

    // 3. x <-> ks dönüşümü (örn: sexs -> sekss, saxo -> sakso)
    let withKs = leet.replace(/x/g, 'ks');
    let withX = leet.replace(/ks/g, 'x');

    // Temiz haller
    const cleanLeet = leet.replace(/[^a-z0-9]/g, '');
    const cleanNoNums = noNums.replace(/[^a-z]/g, '');
    const cleanWithKs = withKs.replace(/[^a-z0-9]/g, '');
    const cleanWithX = withX.replace(/[^a-z0-9]/g, '');

    // Tekrarlayan harfleri teke indirme fonksiyonu (örn: siiik -> sik)
    const collapse = s => s.replace(/(.)\1+/g, '$1');

    return [
      cleanLeet, collapse(cleanLeet),
      cleanNoNums, collapse(cleanNoNums),
      cleanWithKs, collapse(cleanWithKs),
      cleanWithX, collapse(cleanWithX)
    ];
  },

  isProfane(text) {
    if (!text || !text.trim()) return false;
    const raw = text.toLowerCase().trim();

    // 1. Troll numaralar: 31 veya 69 herhangi bir yerde geçiyorsa (ali31, 31can vb.)
    if (/31|69/.test(raw)) return true;

    const variants = this.getVariants(text);

    for (const v of variants) {
      if (!v) continue;
      // Masum kelime ise atla
      if (WHITELIST.includes(v)) return false;

      for (const p of BANNED_PATTERNS) {
        // Tam kelime eşleşmesi
        if (v === p) return true;
        // 3 veya daha uzun köklerin parça eşleşmesi (örn: sex, seks, amk, orospu, yarrak...)
        if (p.length >= 3 && v.includes(p)) return true;
        // 2 harfli kritik kısaltmalar (oc, aq)
        if (p === 'oc' && (v.startsWith('oc') || v.endsWith('oc') || v === 'oc')) return true;
        if (p === 'aq' && (v.startsWith('aq') || v.endsWith('aq') || v === 'aq')) return true;
      }
    }

    return false;
  },

  sanitize(text) {
    if (!text || !text.trim() || this.isProfane(text)) {
      const randomNum = Math.floor(100 + Math.random() * 900);
      return `Civciv#${randomNum}`;
    }
    return text.trim();
  }
};
