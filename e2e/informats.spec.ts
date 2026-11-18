import { test, expect } from '@playwright/test';

test.describe('Informats - Pantalla «Inicio · Hoy, con claridad»', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe cargar la cabecera, el buscador y las 4 noticias principales', async ({ page }) => {
    // Verificar logotipo
    await expect(page.getByRole('button', { name: /Informats/i })).toBeVisible();

    // Verificar buscador fijo
    await expect(page.getByText('¿Qué quieres saber hoy?')).toBeVisible();
    await expect(page.getByPlaceholder('Escribir o hablar')).toBeVisible();

    // Titular principal
    await expect(page.getByRole('heading', { name: '¿Qué está pasando?' })).toBeVisible();

    // Las 4 noticias del diseño
    await expect(page.getByText('SMS de tu banco: señales de alerta y cómo protegerte')).toBeVisible();
    await expect(page.getByText('Tu pensión por internet: dónde consultar tus datos')).toBeVisible();
    await expect(page.getByText('Bono social de la luz: requisitos y pasos para pedirlo')).toBeVisible();
    await expect(page.getByText('Tu cita médica: cómo pedirla sin desplazarte')).toBeVisible();

    // Pie institucional INCIBE
    const incibeHeading = page.getByRole('heading', { name: 'INCIBE' });
    await incibeHeading.scrollIntoViewIfNeeded();
    await expect(incibeHeading).toBeVisible();

    const callLink = page.locator('a[href="tel:017"]');
    await callLink.scrollIntoViewIfNeeded();
    await expect(callLink).toHaveAttribute('href', 'tel:017');
  });

  test('permite buscar noticias y restablecer cuando no hay resultados', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Escribir o hablar');

    // Buscar "pensión"
    await searchInput.fill('pensión');
    await expect(page.getByText('Tu pensión por internet: dónde consultar tus datos')).toBeVisible();
    await expect(page.getByText('SMS de tu banco: señales de alerta y cómo protegerte')).not.toBeVisible();

    // Buscar término inexistente
    await searchInput.fill('término inexistente xyz');
    await expect(page.getByText('No encontramos noticias')).toBeVisible();

    // Restablecer filtros
    await page.getByRole('button', { name: /restablecer filtros/i }).click();
    await expect(page.getByText('SMS de tu banco: señales de alerta y cómo protegerte')).toBeVisible();
  });

  test('gestiona los "Me gusta" y los persiste tras recargar la página', async ({ page }) => {
    // Primera noticia tiene 128 me gusta
    await expect(page.getByText('128')).toBeVisible();

    const firstLikeBtn = page.getByRole('button', { name: /me gusta a «SMS de tu banco/i });
    await firstLikeBtn.click();

    // Contador actualizado a 129
    await expect(page.getByText('129')).toBeVisible();

    // Recargar página
    await page.reload();

    // Debe seguir en 129 y marcado como activo
    await expect(page.getByText('129')).toBeVisible();
    await expect(page.getByRole('button', { name: /quitar me gusta de «SMS de tu banco/i })).toBeVisible();
  });

  test('permite filtrar por categorías temáticas', async ({ page }) => {
    // Seleccionar Mundo Digital
    const digitalTopic = page.getByRole('button', { name: /tema mundo digital/i });
    await digitalTopic.click();

    await expect(page.getByText('SMS de tu banco: señales de alerta y cómo protegerte')).toBeVisible();
    await expect(page.getByText('Tu pensión por internet: dónde consultar tus datos')).not.toBeVisible();

    // Limpiar filtro de temas
    const clearBtn = page.getByRole('button', { name: /limpiar temas/i });
    await clearBtn.click();

    await expect(page.getByText('Tu pensión por internet: dónde consultar tus datos')).toBeVisible();
  });

  test('abre la lectura detallada de la noticia en un diálogo accesible', async ({ page }) => {
    const readBtn = page.getByRole('button', { name: /leer noticia completa: SMS de tu banco/i });
    await readBtn.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Resumen claro y directo:')).toBeVisible();
    await expect(dialog.getByText('Pasos claros para actuar:')).toBeVisible();

    // Cerrar con Escape
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('abre y guarda preferencias de accesibilidad', async ({ page }) => {
    await page.getByRole('button', { name: /accesibilidad/i }).click();

    const a11yDialog = page.getByRole('dialog', { name: /accesibilidad · a tu manera/i });
    await expect(a11yDialog).toBeVisible();

    // Seleccionar "Muy grande"
    await a11yDialog.getByRole('radio', { name: /muy grande/i }).click();

    // Guardar
    await a11yDialog.getByRole('button', { name: /guardar ajustes/i }).click();
    await expect(a11yDialog).not.toBeVisible();

    // Verificar que la clase o data attribute se aplicó
    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toContain('letra-muy-grande');
  });

  test('muestra información contextual de la cuenta', async ({ page }) => {
    await page.getByRole('button', { name: /cuenta/i }).click();

    const accountDialog = page.getByRole('dialog', { name: /mi cuenta/i });
    await expect(accountDialog).toBeVisible();
    await expect(accountDialog.getByText('Carmen Martínez')).toBeVisible();

    await accountDialog.getByRole('button', { name: /entendido/i }).click();
    await expect(accountDialog).not.toBeVisible();
  });
});
