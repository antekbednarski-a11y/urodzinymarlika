// Cała treść niespodzianek. Trzymana wyłącznie po stronie serwera:
// Marlenka dostaje rozdział dopiero wtedy, gdy zostanie odsłonięty w panelu.
//
// W tekstach można używać {{zmienna}} — wartości ustawia się w panelu
// (sekcja „Szczegóły do wpisania”), bez ponownego wdrażania strony.
//
// Slajd:
//   kicker   – mały nagłówek nad tytułem
//   title    – tytuł
//   text     – treść (pusta linia = nowy akapit)
//   photo    – folder w public/img; wszystkie zdjęcia z folderu tworzą galerię.
//              Pusty folder = ludowa rozeta z ikoną.
//   icon     – ikona ilustracji (lista w public/js/icons.js)
//   timeline – [{ time, title, text, icon }]
//   gift     – styl karteczki z miejscem ukrycia prezentu: 'larder' | 'hogwarts' | 'main'

export const VARS = [
  { key: 'myBirthday', label: 'Wspomnienie z moich urodzin (rozdz. „Moja kolej”)', type: 'textarea',
    default: 'Na moje urodziny sprawiłaś, że czułem się najważniejszym człowiekiem na świecie. Pamiętam każdy prezent, każdy uśmiech i to, ile serca w to włożyłaś.' },
  { key: 'giftPlace1', label: 'Gdzie jest prezent nr 1 (polskie specjały)', type: 'textarea',
    default: 'Zajrzyj tam, gdzie zawsze zostawiasz swój płaszcz.' },
  { key: 'giftPlace2', label: 'Gdzie jest prezent nr 2 (list z Hogwartu)', type: 'textarea',
    default: 'Pod schodami? Nie tym razem. Zajrzyj tam, gdzie zasypiamy.' },
  { key: 'giftPlace3', label: 'Gdzie jest prezent nr 3 — główny', type: 'textarea',
    default: 'Tam, gdzie trzymamy herbatę.' },
  { key: 'activity', label: 'Wybrana aktywność', type: 'select',
    options: ['Gokarty', 'Bilard', 'Kino'], default: 'Gokarty' },
  { key: 'activityDetails', label: 'Opis aktywności (godzina, miejsce, wskazówki)', type: 'textarea',
    default: 'Wybrałem to specjalnie pod Twój dzisiejszy nastrój. Szczegóły zdradzę na miejscu.' },
  { key: 'restaurant', label: 'Restauracja', type: 'text',
    default: 'Polska restauracja' },
  { key: 'dinnerDetails', label: 'Opis kolacji', type: 'textarea',
    default: 'Pierogi, żurek, kaczka z jabłkami, a na deser szarlotka? Zamawiaj, co tylko zechcesz — dziś to Ty jesteś królową stołu.' },
  { key: 'finalWish', label: 'Ostatnie słowa (koniec rozdziału „Twój kolejny rok”)', type: 'textarea',
    default: 'Wszystkiego najlepszego, Marlenko. Dziękuję, że jesteś. Ten rok był najlepszy — a następny będzie jeszcze lepszy.' },
];

export const CHAPTERS = [
  {
    id: 'plan',
    title: 'Plan dnia',
    subtitle: 'Co Cię dziś czeka',
    icon: 'leaf',
    slides: [
      {
        kicker: 'Rozdział pierwszy',
        title: 'Plan na Twój dzień',
        icon: 'leaf',
        text: 'Marlenko, dziękuję za odpowiedzi — mam już wszystko, czego potrzebowałem.\n\nOto zarys dnia. Szczegóły będę odsłaniać po kolei, kiedy przyjdzie na nie pora.',
      },
      {
        kicker: 'Dzisiaj',
        title: 'Harmonogram',
        timeline: [
          { time: '16:30 – 17:15', title: 'Przychodzisz do mnie', icon: 'home',
            text: 'Nie wcześniej niż 16:30, nie później niż 17:15. I najlepiej głodna — naprawdę, nie jedz za dużo 😉' },
          { time: 'potem', title: 'Aktywność', icon: 'star',
            text: 'Niespodzianka, dopasowana do Twoich odpowiedzi.' },
          { time: 'wieczorem', title: 'Kolacja', icon: 'plate',
            text: 'Polska kuchnia, tak jak lubimy. Więcej nie powiem.' },
          { time: 'do późna', title: 'Wieczór razem', icon: 'heart',
            text: 'Tylko my dwoje.' },
        ],
      },
      {
        kicker: 'Jeszcze jedno',
        title: 'Miej telefon przy sobie',
        icon: 'gift',
        text: 'W ciągu dnia na tej stronie będą pojawiać się nowe rozdziały.\n\nKiedy powiem „sprawdź telefon” — zajrzyj tutaj.',
      },
    ],
  },
  {
    id: 'gift1',
    title: 'Moja kolej',
    subtitle: 'Prezent pierwszy',
    icon: 'gift',
    slides: [
      {
        kicker: 'Prezent pierwszy',
        title: 'Pamiętasz moje urodziny?',
        photo: '01-moje-urodziny',
        icon: 'candle',
        text: '{{myBirthday}}',
      },
      {
        kicker: 'Prezent pierwszy',
        title: 'Obiecałem sobie, że się odwdzięczę',
        icon: 'heart',
        text: 'Kiedy przyjdzie Twój dzień — z nawiązką.\n\nNo to… zaczynamy.',
      },
      {
        kicker: 'Prezent pierwszy',
        title: 'Prosto z polskiej spiżarni',
        icon: 'jar',
        text: 'Skoro dziś wszystko jest po polsku, to i pierwszy prezent pachnie domem.\n\nOstrzegam: może zniknąć szybciej niż pierogi u babci.',
      },
      {
        kicker: 'Prezent pierwszy',
        title: 'Smacznego, Marlenko!',
        gift: 'larder',
        text: '{{giftPlace1}}',
      },
    ],
  },
  {
    id: 'gift2',
    title: 'Nasz rok',
    subtitle: 'Prezent drugi',
    icon: 'heartpin',
    slides: [
      {
        kicker: 'Luty',
        title: 'Poznaliśmy się',
        photo: '02-luty-poznanie',
        icon: 'heartpin',
        text: 'Koniec lutego. Jeszcze nie wiedziałem, że zaczyna się najlepszy rok.',
      },
      {
        kicker: 'Wrocław',
        title: 'Półmaraton',
        photo: '03-wroclaw-polmaraton',
        icon: 'runner',
        text: '21,0975 km. Ty biegłaś, ja kibicowałem — i byłem z Ciebie dumny jak nigdy.',
      },
      {
        kicker: 'Mazury',
        title: 'Jeziora, grzyby i pick-up',
        photo: '04-mazury',
        icon: 'jeep',
        text: 'Weekend u znajomych, leśne drogi terenówką i pierwsze wspólne grzybobranie.',
      },
      {
        kicker: 'Terespol',
        title: 'Na samym wschodzie',
        photo: '05-terespol',
        icon: 'cottage',
        text: 'Dwa razy u Twoich rodziców. Podlaskie niebo, drewniane chaty i jedzenie, którego się nie zapomina.',
      },
      {
        kicker: 'Sycylia',
        title: 'Ty na desce',
        photo: '06-sycylia',
        icon: 'kite',
        text: 'Słońce, wiatr i Twoje pierwsze kroki w kitesurfingu. Wywrotki też się liczą 😄',
      },
      {
        kicker: 'Orle',
        title: 'Pałac myśliwski',
        photo: '07-orle-palac',
        icon: 'palace',
        text: 'Pomorze Zachodnie, mgła nad lasem, pałac tylko dla nas i pełne kosze grzybów.',
      },
      {
        kicker: 'Prezent drugi',
        title: 'Za ten rok — dziękuję',
        icon: 'heart',
        text: 'Za każdy kilometr, każdą wyprawę i każdy wieczór.\n\nA teraz… sprawdź, czy nie przyleciała do Ciebie sowa.',
      },
      {
        kicker: 'Sowia poczta',
        title: 'List z Hogwartu',
        gift: 'hogwarts',
        text: '{{giftPlace2}}',
      },
    ],
  },
  {
    id: 'gift3',
    title: 'Złota polska jesień',
    subtitle: 'Prezent główny',
    icon: 'mushroom',
    slides: [
      {
        kicker: 'Jesieniara',
        title: 'Twój sezon, Marlik',
        photo: '08-jesien',
        icon: 'cup',
        text: 'Swetry, herbata z sokiem malinowym, liście pod butami i świece wieczorem.\n\nJesień jest najpiękniejsza, odkąd mam ją z Tobą.',
      },
      {
        kicker: 'Grzybobranie',
        title: 'Królowa lasu',
        photo: '09-grzyby',
        icon: 'mushroom',
        text: 'Prawdziwki, podgrzybki, kanie… Jesteś najlepszą grzybiarką, jaką znam.',
      },
      {
        kicker: 'Prezent główny',
        title: 'Brakuje jeszcze jednego dodatku…',
        icon: 'star',
        text: 'Każda jesieniara wie, że stylizacja to nie tylko płaszcz i szalik.\n\nTo coś pójdzie z Tobą na każdy jesienny spacer, na grzyby i na aperol we Włoszech.',
      },
      {
        kicker: 'Prezent główny',
        title: 'Ten najważniejszy',
        gift: 'main',
        text: '{{giftPlace3}}',
      },
    ],
  },
  {
    id: 'activity',
    title: 'Aktywność',
    subtitle: 'Co robimy?',
    icon: 'star',
    slides: [
      {
        kicker: 'Twoja aktywność',
        title: '{{activity}}',
        icon: 'star',
        iconByVar: 'activity',
        text: '{{activityDetails}}',
      },
      {
        kicker: 'Gotowa?',
        title: 'Ruszamy!',
        icon: 'leaf',
        text: 'Weź płaszcz i dobry humor. Resztą zajmę się ja.',
      },
    ],
  },
  {
    id: 'dinner',
    title: 'Kolacja',
    subtitle: 'Po polsku',
    icon: 'plate',
    slides: [
      {
        kicker: 'Kolacja',
        title: '{{restaurant}}',
        photo: '10-restauracja',
        icon: 'plate',
        text: '{{dinnerDetails}}',
      },
      {
        kicker: 'Smacznego',
        title: 'Teraz już wiesz',
        icon: 'heart',
        text: '…dlaczego miałaś przyjść głodna 😉',
      },
    ],
  },
  {
    id: 'nextyear',
    title: 'Twój kolejny rok',
    subtitle: 'Życzenia',
    icon: 'sun',
    slides: [
      {
        kicker: 'Życzenia',
        title: 'Czego Ci życzę',
        icon: 'sun',
        text: 'Zdrowia, szczęścia, pomyślności — to klasyka i życzę Ci jej z całego serca.\n\nAle mam też kilka bardzo konkretnych życzeń…',
      },
      {
        kicker: 'Sylwester',
        title: 'Włoskie Alpy',
        photo: '11-wlochy-narty',
        icon: 'ski',
        text: 'Narty w słońcu, après-ski, aperol i vin brulé. Nowy rok witamy w górach — razem.',
      },
      {
        kicker: 'Kwiecień',
        title: 'Namibia',
        photo: '12-namibia',
        icon: 'jeep',
        text: 'Terenówką przez czerwone wydmy, safari, a nocą niebo pełne gwiazd. Nie mogę się doczekać.',
      },
      {
        kicker: 'Lato',
        title: 'Powrót na Sycylię',
        photo: '13-sycylia-powrot',
        icon: 'kite',
        text: 'Wracamy nad morze, a Ty wracasz na deskę. Może tym razem to Ty nauczysz mnie kajta?',
      },
      {
        kicker: 'I wszystko inne',
        title: 'Kolejne półmaratony i pełne kosze grzybów',
        icon: 'runner',
        text: 'Kolejne podróże, kolejne wieczory pod kocem, kolejne wspólne przygody.',
      },
      {
        kicker: 'Wszystkiego najlepszego',
        title: 'Sto lat, Marlenko!',
        icon: 'heart',
        final: true,
        text: '{{finalWish}}',
      },
    ],
  },
];

export const ACTIVITY_ICONS = { Gokarty: 'kart', Bilard: 'billiard', Kino: 'cinema' };

export function defaultVars() {
  return Object.fromEntries(VARS.map(v => [v.key, v.default]));
}

function fill(str, vars) {
  return typeof str === 'string'
    ? str.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '')
    : str;
}

// Rozdział z podstawionymi wartościami — gotowy do wysłania na front.
export function renderChapter(ch, vars) {
  return {
    id: ch.id,
    title: ch.title,
    subtitle: ch.subtitle,
    icon: ch.icon,
    slides: ch.slides.map(s => {
      const out = { ...s, title: fill(s.title, vars), text: fill(s.text, vars), kicker: fill(s.kicker, vars) };
      if (s.iconByVar) out.icon = ACTIVITY_ICONS[vars[s.iconByVar]] || s.icon;
      delete out.iconByVar;
      if (s.timeline) out.timeline = s.timeline.map(t => ({ ...t, text: fill(t.text, vars), title: fill(t.title, vars) }));
      return out;
    }),
  };
}
