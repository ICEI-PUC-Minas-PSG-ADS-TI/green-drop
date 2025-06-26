/* eslint-disable no-console */
/* global console */
import { decode as b64Decode } from 'base-64';

export function decodeJWT(token) {
  try {
    const [, payload] = token.split('.');
    const json = b64Decode(payload);
    return JSON.parse(json);
  } catch (e) {
    console.error('Falha ao decodificar JWT manualmente:', e);
    return null;
  }
}
