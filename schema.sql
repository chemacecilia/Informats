-- =============================================================================
-- PROYECTO: Informats
-- MOTOR: PostgreSQL (Supabase)
-- DESCRIPCIÓN: Esquema completo de 5 tablas basado en el diseño de Figma,
--              índices FK, RLS activo sin políticas, datos de prueba y SELECTs.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- BLOQUE 1: CREACIÓN DE TABLAS EN ORDEN DE DEPENDENCIAS
-- -----------------------------------------------------------------------------

-- 1.1 Tabla independiente: Temas / Categorías (Píldoras y filtros de Figma)
CREATE TABLE public.temas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    icono TEXT,
    color TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.2 Tabla dependiente: Noticias (Requiere public.temas)
CREATE TABLE public.noticias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tema_id UUID NOT NULL REFERENCES public.temas(id) ON DELETE RESTRICT,
    titulo TEXT NOT NULL,
    resumen_sencillo TEXT NOT NULL,
    contenido TEXT NOT NULL,
    imagen_url TEXT,
    url_audio TEXT,
    organismo_fuente TEXT,
    estado_evidencia TEXT NOT NULL DEFAULT 'Verificada',
    pasos_actuar TEXT,
    es_destacada BOOLEAN NOT NULL DEFAULT false,
    fecha_publicacion TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.3 Tabla dependiente: Dudas y Respuestas en profundidad (Requiere public.noticias)
CREATE TABLE public.dudas_respuestas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    noticia_id UUID NOT NULL REFERENCES public.noticias(id) ON DELETE CASCADE,
    pregunta_original TEXT NOT NULL,
    respuesta_clara TEXT NOT NULL,
    requisitos TEXT,
    enlace_oficial TEXT,
    orden INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.4 Tabla dependiente: Preferencias de accesibilidad (Relación 1:1 con auth.users)
CREATE TABLE public.preferencias_accesibilidad (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tamano_letra TEXT NOT NULL DEFAULT 'grande' CHECK (tamano_letra IN ('mediana', 'grande', 'muy_grande')),
    alto_contraste BOOLEAN NOT NULL DEFAULT false,
    lectura_asistida BOOLEAN NOT NULL DEFAULT true,
    velocidad_voz NUMERIC(3, 2) NOT NULL DEFAULT 0.90,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.5 Tabla dependiente: Noticias guardadas / Me gusta (Relación N:M entre auth.users y noticias)
CREATE TABLE public.noticias_guardadas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    noticia_id UUID NOT NULL REFERENCES public.noticias(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_usuario_noticia UNIQUE (usuario_id, noticia_id)
);

-- -----------------------------------------------------------------------------
-- BLOQUE 2: ÍNDICES DE RENDIMIENTO PARA CLAVES FORÁNEAS (FK)
-- -----------------------------------------------------------------------------
CREATE INDEX idx_noticias_tema_id ON public.noticias(tema_id);
CREATE INDEX idx_dudas_respuestas_noticia_id ON public.dudas_respuestas(noticia_id);
CREATE INDEX idx_noticias_guardadas_usuario ON public.noticias_guardadas(usuario_id);
CREATE INDEX idx_noticias_guardadas_noticia ON public.noticias_guardadas(noticia_id);

-- -----------------------------------------------------------------------------
-- BLOQUE 3: ACTIVACIÓN DE RLS (ROW LEVEL SECURITY) SIN POLÍTICAS
-- -----------------------------------------------------------------------------
ALTER TABLE public.temas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dudas_respuestas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preferencias_accesibilidad ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noticias_guardadas ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- BLOQUE 4: INSERCIÓN DE DATOS FICTICIOS (8 FILAS EN TOTAL)
-- -----------------------------------------------------------------------------

-- 4.1 Temas (2 filas)
INSERT INTO public.temas (id, nombre, icono, color) VALUES
('e1000000-0000-0000-0000-000000000001', 'Mundo Digital', 'shield-check', '#E0F2FE'),
('e1000000-0000-0000-0000-000000000002', 'Trámites', 'file-text', '#FEF3C7');

-- 4.2 Noticias (3 filas)
INSERT INTO public.noticias (
    id, tema_id, titulo, resumen_sencillo, contenido, 
    imagen_url, url_audio, organismo_fuente, estado_evidencia, 
    pasos_actuar, es_destacada, fecha_publicacion
) VALUES
(
    'b1000000-0000-0000-0000-000000000001',
    'e1000000-0000-0000-0000-000000000001',
    'Cuidado con los mensajes SMS que dicen ser de tu banco',
    'Tu banco nunca te pedirá contraseñas por mensaje ni que pulses en enlaces urgentes.',
    'Se han detectado mensajes fraudulentos que suplantan a entidades bancarias. Los estafadores intentan asustar diciendo que tu cuenta ha sido bloqueada para que entres a una web falsa.',
    'https://ejemplo.com/imagenes/sms-banco.jpg',
    'https://ejemplo.com/audio/sms-banco.mp3',
    'INCIBE (Instituto Nacional de Ciberseguridad)',
    'Información oficial verificada',
    '1. No pulses en el enlace. 2. Llama al teléfono que viene detrás de tu tarjeta bancaria. 3. Borra el mensaje.',
    true,
    now()
),
(
    'b1000000-0000-0000-0000-000000000002',
    'e1000000-0000-0000-0000-000000000002',
    'Bono social de la luz: quién puede pedirlo y cuánto descuentan',
    'El descuento en la factura eléctrica puede llegar hasta el 80% para personas jubiladas con pensión mínima.',
    'El bono social eléctrico es una ayuda estatal destinada a reducir el importe de la factura de electricidad en la vivienda habitual para pensionistas y hogares con ingresos ajustados.',
    'https://ejemplo.com/imagenes/bono-luz.jpg',
    'https://ejemplo.com/audio/bono-luz.mp3',
    'Ministerio para la Transición Ecológica',
    'Información oficial verificada',
    '1. Revisa tu última factura. 2. Contacta con tu compañía comercializadora de referencia. 3. Presenta tu DNI y justificante de pensión.',
    true,
    now()
),
(
    'b1000000-0000-0000-0000-000000000003',
    'e1000000-0000-0000-0000-000000000002',
    'Cómo pedir cita médica en tu centro de salud sin desplazarte',
    'Puedes pedir cita por teléfono o por internet con la ayuda de tu tarjeta sanitaria.',
    'Los centros de salud disponen de líneas telefónicas preferentes para personas mayores donde una operadora asigna la cita sin necesidad de usar ordenadores.',
    'https://ejemplo.com/imagenes/cita-medica.jpg',
    'https://ejemplo.com/audio/cita-medica.mp3',
    'Conselleria de Sanitat',
    'Información oficial verificada',
    '1. Ten a mano tu tarjeta SIP/Sanitaria. 2. Llama al número de tu ambulatorio. 3. Elige consulta presencial o telefónica.',
    false,
    now()
);

-- 4.3 Dudas y respuestas en profundidad (3 filas)
INSERT INTO public.dudas_respuestas (
    id, noticia_id, pregunta_original, respuesta_clara, 
    requisitos, enlace_oficial, orden
) VALUES
(
    'd1000000-0000-0000-0000-000000000001',
    'b1000000-0000-0000-0000-000000000001',
    '¿Qué debo hacer si he pulsado en el enlace por error?',
    'Mantén la calma. Llama inmediatamente al teléfono que viene detrás de tu tarjeta bancaria y avisa para que bloqueen cualquier intento de cobro.',
    'Tener a mano tu DNI y tu libreta o tarjeta bancaria.',
    'https://www.incibe.es/linea-de-ayuda-en-ciberseguridad',
    1
),
(
    'd1000000-0000-0000-0000-000000000002',
    'b1000000-0000-0000-0000-000000000002',
    '¿Cómo pido el bono social de la luz si vivo solo con mi pensión?',
    'Si percibes la pensión mínima de jubilación o incapacidad permanente, tienes derecho automático al bono social como consumidor vulnerable.',
    'Ser el titular del contrato de la luz y tener contratada la tarifa regulada (PVPC).',
    'https://sede.serviciosmin.gob.es/es-es/procedimientoselectronicos/Paginas/detalle-procedimientos.aspx?IdProcedimiento=159',
    1
),
(
    'd1000000-0000-0000-0000-000000000003',
    'b1000000-0000-0000-0000-000000000002',
    '¿Tengo que renovar el bono social todos los años?',
    'Se renueva automáticamente cada dos años siempre que la Seguridad Social y la comercializadora confirmen que sigues cobrando la misma pensión.',
    'Estar al corriente de pago en las facturas de la luz.',
    'https://energia.gob.es/bono-social',
    2
);

-- -----------------------------------------------------------------------------
-- BLOQUE 5: CONSULTAS SELECT DE PRUEBA
-- -----------------------------------------------------------------------------

-- Consulta 1: Para la pantalla "Inicio · Hoy, con claridad"
SELECT 
    n.titulo AS titular,
    n.resumen_sencillo AS resumen_portada,
    t.nombre AS tema,
    t.color AS color_etiqueta,
    n.organismo_fuente AS entidad_oficial,
    n.estado_evidencia AS verificacion
FROM public.noticias n
JOIN public.temas t ON n.tema_id = t.id
WHERE n.es_destacada = true
ORDER BY n.fecha_publicacion DESC;

-- Consulta 2: Para la pantalla "Respuesta · Bono social de la luz"
SELECT 
    n.titulo AS noticia_principal,
    d.orden AS paso_numero,
    d.pregunta_original AS duda_resuelta,
    d.respuesta_clara AS explicacion_facil,
    d.requisitos AS que_necesitas,
    d.enlace_oficial AS web_oficial
FROM public.noticias n
JOIN public.dudas_respuestas d ON n.id = d.noticia_id
WHERE n.id = 'b1000000-0000-0000-0000-000000000002'
ORDER BY d.orden ASC;
