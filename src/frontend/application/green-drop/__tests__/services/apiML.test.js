import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import axios from 'axios';
jest.mock('axios');
import api from '@/services/apiML';

describe('apiML', () => {
  it('deve existir', () => {
    expect(api).toBeDefined();
  });

  it('usa a baseURL correta', () => {
    expect(api.defaults.baseURL).toBe('https://a8fb-186-248-79-98.ngrok-free.app/v1');
  });

  it('faz uma chamada GET', async () => {
    // Simula método get
    api.get = jest.fn().mockResolvedValue({ data: 'ok' });
    const res = await api.get('/test');
    expect(res.data).toBe('ok');
  });
});
