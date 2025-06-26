/**

* Teste E2E de exemplo usando Detox
  */

describe('E2E App', () => {
beforeAll(async () => {
await detox.init();
});

afterAll(async () => {
await detox.cleanup();
});

it('deve exibir tela inicial', async () => {
await expect(element(by.text('Bem-vinda'))).toBeVisible();
});
});
