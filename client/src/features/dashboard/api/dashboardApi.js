import { buildApiUrl, env } from '../../../shared/config/env';
import { httpClient } from '../../../shared/lib/api/httpClient';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardApiConfig = {
  path: env.dashboardSummaryPath,
  url: buildApiUrl(env.dashboardSummaryPath),
};

const mockSummary = {
  metrics: [
    { label: 'Dnešní rezervace', value: '24', helper: '+12 % oproti včerejšku' },
    { label: 'Obsazenost', value: '78 %', helper: 'Nejvíce vytížený čas 17:00' },
    { label: 'Noví zákazníci', value: '9', helper: '4 přišli přes doporučení' },
    { label: 'Čekající akce', value: '6', helper: 'Potvrzení a follow-up zprávy' },
  ],
  timeline: [
    'Zkontrolovat dnešní rezervace po 17:00.',
    'Potvrdit 3 rezervace čekající na ruční schválení.',
    'Ověřit kontakt na zákazníka Nováková.',
  ],
};

export async function fetchDashboardSummary() {
  if (env.useMockDashboard) {
    await sleep(500);

    return {
      ...mockSummary,
      mocked: true,
      endpoint: dashboardApiConfig.url,
    };
  }

  // Tohle je přesně to místo, kde se později napojí reálný backend.
  // Stránka samotná vůbec nemusí vědět, z jaké URL data přichází.
  // `httpClient` už má nastavenou base URL z `.env`, takže tady držíme jen konkrétní path.
  //
  // Praktický přínos:
  // - při změně domény nebo prostředí měníme `.env`, ne komponenty
  // - při změně endpointu saháme jen do API vrstvy
  // - page komponenta zůstává čistě prezentační
  const { data } = await httpClient.get(dashboardApiConfig.path);
  return data;
}
