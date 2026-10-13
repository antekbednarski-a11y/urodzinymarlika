# Urodziny Marlenki 🍁

Jesienno-ludowa strona na urodziny: PIN → formularz nastroju → panel organizatora → rozdziały odsłaniane w ciągu dnia.

- PIN Marlenki: `1310`, PIN organizatora: `4444` (można nadpisać zmiennymi `PIN_HER` / `PIN_ME` w Netlify).
- Treść rozdziałów: `netlify/shared/content.mjs` (trzymana na serwerze — nie da się jej podejrzeć przed odsłonięciem).
- Teksty typu „gdzie jest prezent”, aktywność i restauracja ustawia się w panelu, bez ponownego wdrażania.

## Zdjęcia

Każde wydarzenie ma swój folder w `public/img/`. Wrzucaj zdjęcia z dowolnymi nazwami (`.jpg`, `.png`, `.webp`) —
wszystkie z folderu pokażą się jako przesuwana galeria polaroidów (kolejność alfabetyczna).
Pusty folder = ludowa rozeta z ikoną. Po wrzuceniu Netlify sam przebuduje stronę (~1 min).

| Folder | Slajd |
|---|---|
| `01-moje-urodziny` | Prezent 1 – „Pamiętasz moje urodziny?” |
| `02-luty-poznanie` | Nasz rok – poznanie |
| `03-wroclaw-polmaraton` | Nasz rok – półmaraton |
| `04-mazury` | Nasz rok – Mazury, pick-up |
| `05-terespol` | Nasz rok – Terespol |
| `06-sycylia` | Nasz rok – kitesurfing |
| `07-orle-palac` | Nasz rok – pałac myśliwski |
| `08-jesien` | Prezent główny – jesieniara |
| `09-grzyby` | Prezent główny – grzybobranie |
| `10-restauracja` | Kolacja |
| `11-wlochy-narty` | Kolejny rok – narty we Włoszech |
| `12-namibia` | Kolejny rok – Namibia |
| `13-sycylia-powrot` | Kolejny rok – powrót na Sycylię |

Wrzucanie przez GitHub: wejdź w folder → **Add file → Upload files** → przeciągnij zdjęcia → **Commit changes**
(na gałęzi, z której wdraża Netlify).

## Wdrożenie na Netlify

1. Netlify → **Add new site → Import an existing project → GitHub** → to repo.
2. Branch: ten z kodem. Build command i publish directory wczytają się z `netlify.toml`.
3. **Deploy**. Netlify Blobs działa bez konfiguracji.

## Lokalnie

```
npm install
npm run dev   # http://localhost:8888
```
