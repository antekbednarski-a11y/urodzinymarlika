# Urodziny Marlenki 🍁

Jesienno-ludowa strona na urodziny: PIN → formularz nastroju → panel organizatora → rozdziały odsłaniane w ciągu dnia.

- PIN Marlenki: `1310`, PIN organizatora: `4444` (można nadpisać zmiennymi `PIN_HER` / `PIN_ME` w Netlify).
- Treść rozdziałów: `netlify/shared/content.mjs` (trzymana na serwerze — nie da się jej podejrzeć przed odsłonięciem).
- Teksty typu „gdzie jest prezent”, aktywność i restauracja ustawia się w panelu, bez ponownego wdrażania.

## Zdjęcia

Wrzuć do `public/img/` pliki o tych nazwach (`.jpg`, `.jpeg`, `.png` lub `.webp`). Brak pliku = ludowa rozeta z ikoną.

| Plik | Gdzie się pokaże |
|---|---|
| `moje-urodziny` | Prezent 1 – „Pamiętasz moje urodziny?” |
| `luty` | Nasz rok – poznanie |
| `wroclaw` | Nasz rok – półmaraton |
| `mazury` | Nasz rok – Mazury, pick-up |
| `terespol` | Nasz rok – Terespol |
| `sycylia` | Nasz rok – kitesurfing |
| `orle` | Nasz rok – pałac myśliwski |
| `jesien` | Prezent 3 – jesieniara |
| `grzyby` | Prezent 3 – grzybobranie |
| `restauracja` | Kolacja |
| `wlochy` | Kolejny rok – narty we Włoszech |
| `namibia` | Kolejny rok – Namibia |
| `sycylia-2` | Kolejny rok – powrót na Sycylię |

## Wdrożenie na Netlify

1. Netlify → **Add new site → Import an existing project → GitHub** → to repo.
2. Branch: ten z kodem, build command: puste, publish directory: `public` (wczyta się z `netlify.toml`).
3. **Deploy**. Netlify Blobs działa bez konfiguracji.

## Lokalnie

```
npm install
npm run dev   # http://localhost:8888
```
