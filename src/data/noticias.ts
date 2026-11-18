import type { Noticia, Categoria } from '../types';
import imgSms from '../assets/noticia-sms.png';
import imgPension from '../assets/noticia-pension.png';
import imgBonoLuz from '../assets/noticia-bono-luz.png';
import imgCitaMedica from '../assets/noticia-cita-medica.png';

export const CATEGORIAS_DISPONIBLES: Categoria[] = [
  'España',
  'Internacional',
  'Valencia',
  'Economía',
  'Mundo Digital',
  'Deporte',
  'Política',
  'Cultura',
  'Sociedad',
  'Salud',
  'Trámites',
];

export const NOTICIAS_INICIALES: Noticia[] = [
  {
    id: 'noticia-01',
    titulo: 'SMS de tu banco: señales de alerta y cómo protegerte',
    categorias: ['Mundo Digital'],
    resumenSencillo:
      'Los bancos nunca piden claves secretas ni contraseñas a través de enlaces enviados por SMS. Si recibes un mensaje urgente advirtiendo de un bloqueo ficticio, es un intento de fraude.',
    contenido:
      'Los ciberdelincuentes envían mensajes de texto haciéndose pasar por tu entidad bancaria habitual. Suelen afirmar que tu cuenta ha sido bloqueada temporalmente o que se ha detectado un movimiento sospechoso, invitándote a pulsar un enlace para solucionarlo.\n\nRecuerda: las entidades bancarias legítimas jamás te solicitarán que introduzcas tus claves de acceso completas ni códigos de confirmación recibidos en tu móvil mediante un enlace externo.',
    imagenUrl: imgSms,
    imagenAlt: 'Teléfono móvil mostrando un mensaje de texto sospechoso sobre una mesa',
    organismoFuente: 'INCIBE y Banco de España',
    estadoEvidencia: 'Verificada',
    pasosActuar: [
      'No pulses ningún enlace incluido en el mensaje de texto.',
      'No facilites nunca tus contraseñas ni códigos recibidos por SMS.',
      'Si tienes dudas, accede a la banca digital directamente desde su app oficial o escribe su dirección web en el navegador.',
      'Llama a la Línea de Ayuda en Ciberseguridad de INCIBE marcando el 017 (gratuito y confidencial).',
    ],
    enlaceOficial: 'https://www.incibe.es/linea-de-ayuda-en-ciberseguridad',
    fechaPublicacion: '2026-11-17T09:00:00Z',
    likesIniciales: 128,
  },
  {
    id: 'noticia-02',
    titulo: 'Tu pensión por internet: dónde consultar tus datos',
    categorias: ['Economía', 'Trámites'],
    resumenSencillo:
      'Puedes consultar la cuantía exacta de tu pensión, el historial de revalorizaciones y descargar certificados oficiales al instante desde el portal público «Tu Seguridad Social».',
    contenido:
      'El Instituto Nacional de la Seguridad Social pone a disposición de todos los pensionistas un espacio digital sencillo y seguro. A través de este portal oficial puedes comprobar las nóminas mensuales, descargar el certificado de retenciones y verificar tus datos personales sin necesidad de pedir cita previa ni desplazarte a una oficina física.',
    imagenUrl: imgPension,
    imagenAlt: 'Documento oficial de la pensión y gafas de lectura',
    organismoFuente: 'Seguridad Social (Ministerio de Inclusión)',
    estadoEvidencia: 'Oficial',
    pasosActuar: [
      'Accede a la sede electrónica en sede.seg-social.gob.es.',
      'Identifícate con el sistema Cl@ve, certificado digital o mediante SMS si tu teléfono está registrado.',
      'Entra en el apartado «Pensiones» para consultar el desglose de tu prestación.',
      'Descarga tu certificado oficial en formato PDF listo para imprimir o enviar.',
    ],
    enlaceOficial: 'https://sede.seg-social.gob.es',
    fechaPublicacion: '2026-11-16T10:30:00Z',
    likesIniciales: 86,
  },
  {
    id: 'noticia-03',
    titulo: 'Bono social de la luz: requisitos y pasos para pedirlo',
    categorias: ['Economía', 'Trámites'],
    resumenSencillo:
      'El bono social es un descuento directo en la factura de la luz destinado a pensionistas con pensiones mínimas, personas vulnerables y familias numerosas.',
    contenido:
      'El bono social eléctrico ofrece un descuento de entre el 40% y el 80% sobre la factura regulada (PVPC). Para solicitarlo es imprescindible tener contratada la tarifa regulada con una de las comercializadoras de referencia del mercado y cumplir con los criterios de renta o situación socioeconómica fijados por la normativa estatal.',
    imagenUrl: imgBonoLuz,
    imagenAlt: 'Factura de electricidad y bombilla de bajo consumo',
    organismoFuente: 'Ministerio para la Transición Ecológica',
    estadoEvidencia: 'Verificada',
    pasosActuar: [
      'Revisa que tu contrato pertenezca al mercado regulado (tarifa PVPC).',
      'Reúne el certificado de empadronamiento colectivo y la fotocopia de tu DNI.',
      'Rellena el modelo oficial de solicitud proporcionado por tu comercializadora de referencia.',
      'Envía la solicitud por correo electrónico, teléfono o presencialmente en los puntos de atención autorizados.',
    ],
    enlaceOficial: 'https://www.bonosocial.gob.es',
    fechaPublicacion: '2026-11-15T12:00:00Z',
    likesIniciales: 94,
  },
  {
    id: 'noticia-04',
    titulo: 'Tu cita médica: cómo pedirla sin desplazarte',
    categorias: ['Salud', 'Trámites'],
    resumenSencillo:
      'Pedir o modificar tu consulta con el médico de familia o enfermería es posible desde la aplicación móvil oficial de tu servicio autonómico de salud o llamando por teléfono.',
    contenido:
      'Los sistemas sanitarios autonómicos ofrecen herramientas digitales para gestionar citas en atención primaria de manera ágil. Puedes seleccionar cita presencial o consulta telefónica, comprobar citas pendientes e incluso añadir un recordatorio a tu calendario, evitando esperas y desplazamientos innecesarios al centro de salud.',
    imagenUrl: imgCitaMedica,
    imagenAlt: 'Consulta médica con estetoscopio y calendario de citas',
    organismoFuente: 'Consejería de Sanidad y Salud Pública',
    estadoEvidencia: 'Oficial',
    pasosActuar: [
      'Ten preparada tu tarjeta sanitaria para consultar el código SIP o CIP.',
      'Descarga la app oficial de sanidad de tu comunidad o entra en su portal web.',
      'Selecciona el motivo: consulta con médico de cabecera, enfermería o receta electrónica.',
      'Elige el día y la franja horaria que mejor se adapte a tus necesidades.',
    ],
    enlaceOficial: 'https://www.mscbs.gob.es',
    fechaPublicacion: '2026-11-14T08:45:00Z',
    likesIniciales: 63,
  },
];
