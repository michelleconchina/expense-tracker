import Constants from 'expo-constants';

const API_PORT = 5024;

// Expo Go on your phone can't resolve "localhost" — that would point at the
// phone itself, not your computer. `hostUri` is the address your phone is
// already using to reach the Metro dev server (e.g. "192.168.100.17:8081"),
// so reusing its host means the API URL updates itself whenever your
// computer's LAN IP changes — no manual edits needed.
function getApiBaseUrl(): string {
  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(':')[0];

  if (!host) {
    throw new Error(
      "Couldn't determine the dev server host from Constants.expoConfig.hostUri. " +
        'Are you running this outside of `expo start`?'
    );
  }

  return `http://${host}:${API_PORT}`;
}

export const API_BASE_URL = getApiBaseUrl();
