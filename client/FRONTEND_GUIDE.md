# Bookio Frontend Guide

Tento dokument popisuje, jak je aktuálně poskládaný frontend v `client/` a jak do něj bezpečně přidávat další funkcionalitu.

## Stack

- `React` pro UI
- `react-router-dom` pro routování
- `@tanstack/react-query` pro server state a request lifecycle
- `axios` jako společný HTTP klient
- `@chakra-ui/react` pro základní UI primitives

## Adresářová struktura

Frontend je rozdělený podle odpovědností:

- `client/src/app`
  - globální composition aplikace
  - providers
  - router
- `client/src/features`
  - feature-based moduly
  - každá větší oblast aplikace má vlastní `api`, `components`, `hooks`, `pages`
- `client/src/shared`
  - sdílené komponenty a utility
  - typicky layout, navigation, modal, api client, helpers
- `client/src/components/ui`
  - Chakra helpery a wrapper provider

## Kde co hledat

- Root aplikace: `client/src/App.js`
- React Query setup: `client/src/app/providers/AppProviders.jsx`
- Router: `client/src/app/router/AppRouter.jsx`
- Axios klient: `client/src/shared/lib/api/httpClient.js`
- Better Auth klient: `client/src/shared/lib/auth/authClient.js`
- Environment config: `client/src/shared/config/env.js`
- Auth feature: `client/src/features/auth`
- Dashboard example with comments: `client/src/features/dashboard`
- Navbar template: `client/src/shared/components/navigation/Navbar.jsx`
- Modal template: `client/src/shared/components/feedback/ModalTemplate.jsx`

## Jak přidat novou feature

Pro novou oblast aplikace držte stejný pattern jako u `features/auth`.

1. Vytvořte složku `client/src/features/<feature-name>`.
2. Pokud feature komunikuje s backendem, přidejte `api/`.
3. Reusable UI uvnitř feature dejte do `components/`.
4. React Query hooky dejte do `hooks/`.
5. Route-level obrazovky dejte do `pages/`.
6. Novou route doplňte v `client/src/app/router/AppRouter.jsx`.

## Práce s API

- Nepoužívejte `fetch` napřímo uvnitř komponent, pokud nejde o jednorázový experiment.
- Pro HTTP volání používejte `httpClient` ze `shared/lib/api/httpClient.js`.
- URL endpointy berte z `.env` nebo `.env.example`.
- API funkce patří do `features/<feature>/api`.
- `useQuery` a `useMutation` hooky patří do `features/<feature>/hooks`.
- Komponenta by měla ideálně jen sbírat vstupy, vykreslit stav a zavolat feature hook.

## .env proměnné

Frontend je připravený na backend URL v `client/.env`.

- `REACT_APP_API_URL`
- `REACT_APP_AUTH_SERVER_URL`
- `REACT_APP_DASHBOARD_SUMMARY_PATH`
- `REACT_APP_USE_MOCK_DASHBOARD`

Frontend auth teď používá Better Auth backend v `servers/user_service`.
Pro lokální vývoj tedy musí běžet jak klient, tak user service.

Při využívání .env rovnou vytvářet i .env.example.

## Lokální spuštění auth stacku

Pokud chcete rozběhnout přihlášení a registraci lokálně, nestačí pustit jen `client`.
Je potřeba spustit i Better Auth backend v `servers/user_service`.

```bash
cd servers/user_service
npm install
npm run auth:migrate
npm start
```

Ve druhém terminálu:

```bash
cd client
npm install
npm start
```

Frontend potom komunikuje s Better Auth backendem přes `REACT_APP_AUTH_SERVER_URL`.
Pro lokální vývoj je defaultně nastavené `http://localhost:4001`.

## Auth guard

- Všechny interní route běží za `ProtectedRoute`.
- Nepřihlášený uživatel je vždy přesměrován na `/auth`.
- Auth state je centralizovaný v `client/src/features/auth/context/AuthContext.jsx`.
- Auth session spravuje Better Auth client přes `useSession()`.
- Pro běžný app flow používáme klasické Better Auth session/cookie řešení.

## Design pravidla

- Aktuální auth screen kopíruje referenční minimalistický layout:
  - tmavé okolí
  - světle modrý obsahový panel
  - černý top bar
  - bílý formulářový card
- Nové obrazovky by měly používat stejné CSS tokeny z `client/src/index.css`.
- Pokud přidáváte nový reusable prvek, preferujte `shared/components`.

## Co je zatím jen template

- Login/register formuláře běží přes Better Auth backend.
- Google login button už používá Better Auth social sign-in flow a začne fungovat po doplnění Google OAuth credentials do `servers/user_service/.env`.
- Dashboard obsahuje komentovaný příklad práce s axios a React Query.

## Doporučený workflow pro zbylé v teamu

1. Přidejte feature složku.
2. Nejdřív připravte page a statické UI.
3. Poté přidejte API vrstvu a React Query hooky.
4. Až nakonec napojujte konkrétní backend endpointy.
5. Po změnách vždy spusťte `npm run build` v `client/`.

## Ověření

Používané příkazy:

```bash
cd client
npm start
npm run build
CI=true npm test -- --watchAll=false
```
