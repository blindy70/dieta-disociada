// =========================================================================
// DIETA DISOCIADA — Datos extraídos de los 3 PDFs (OCR)
//  - Dieta disociada DESINTOXICANTE.pdf
//  - Dieta Disociada 2013.pdf (semanas 1-14)
//  - Dieta disociada MANTENIMIENTO.pdf
//
// Estructura de FASES:
//   fase = {
//     id, nombre, tipo: 'desintoxicante' | 'clasica' | 'mantenimiento',
//     subfases?: [ { id, titulo, maybe semana } ],
//     dias: 1..n  (cada dia: { cena, comida, ... })
//   }
// Las notas manuscritas se listan aparte (NOTAS_MANUSCRITAS) con marcas
// [REVISAR] porque el OCR no las transcribe con fiabilidad.
// =========================================================================

const DIETA_DATA = {

fases: [
  // ---------------------------------------------------------------
  // FASE 1: DESINTOXICANTE / ADELGAZANTE
  // ---------------------------------------------------------------
  {
    id: 'desintoxicante',
    nombre: 'Desintoxicante / Adelgazante',
    tipo: 'desintoxicante',
    detalle: 'Menú por días. Repite la secuencia 1-7 las veces que haga falta.',
    desayunoBase: 'Infusiones y fruta hasta medio día (salvo el día 4).',
    comidaBase: '',
    dias: [
      {
        n: 1,
        desayuno: 'Infusiones y fruta hasta a medio día. Cada hora puedes cambiar de fruta.',
        comida: 'Espárragos a la plancha (un manojo), calabacín al vapor y jamón cocido o lacón a la plancha con pimentón y aceite en crudo.',
        merienda: 'Fruta de un solo tipo.',
        cena: 'Espárragos cocidos con calabacín a la plancha y un huevo duro o tortilla francesa o revuelto. Tomar el caldo de cocer los espárragos (si se cuecen).',
        alternativas_comida: ['Espárragos a la plancha + calabacín al vapor + jamón cocido/lacón']
      },
      {
        n: 2,
        desayuno: 'Infusiones y manzanas hasta medio día.',
        comida: 'Arroz al ajillo y manzanas crudas a la plancha (250 g de arroz en crudo).',
        merienda: 'Manzanas.',
        cena: 'Arroz y manzanas (en compota, sin azúcar, con edulcorante).',
        alternativas_comida: ['Arroz al ajillo con manzanas']
      },
      {
        n: 3,
        desayuno: 'Infusiones y fruta hasta mediodía.',
        comida: 'Fruta durante todo el día o ensalada de vegetales crudos (aguacate, manzana, canónigos, endibia, escarola, pepino, tomate, pimiento rojo, lechuga).',
        merienda: 'Fruta.',
        cena: 'Ensalada variada de verduras (canónigos, tomate, escarola, manzanas) o solo fruta, o ensalada de escarola con granadas y de postre piña natural.',
        alternativas_comida: ['Fruta todo el día', 'Ensalada de vegetales crudos']
      },
      {
        n: 4,
        desayuno: 'Café con leche y dos tostadas con aceite y tomate.',
        mediaManana: 'Fruta.',
        comida: 'Ternera asada o a la plancha (o pescado a la plancha) con calabacín a la plancha.',
        merienda: 'Fruta.',
        cena: 'Ensalada de lechuga, tomate, pepino, cebolla y 1 huevo duro y queso.',
        alternativas_comida: ['Ternera asada/plancha + calabacín', 'Pescado plancha + calabacín']
      },
      {
        n: 5,
        desayuno: 'Igual que el anterior.',
        mediaManana: 'Fruta.',
        comida: 'Pescado asado, a la plancha o hervido con gambas y chirlas y acelgas.',
        merienda: 'Fruta.',
        cena: 'Ahumados, queso de Burgos, lacón y ensalada de tomate y cebolla.',
        alternativas_comida: ['Pescado con gambas y chirlas + acelgas']
      },
      {
        n: 6,
        desayuno: 'Igual.',
        mediaManana: 'Fruta.',
        comida: 'Sopa de menestra y ensalada de canónigos con tomate y aguacate.',
        merienda: 'Fruta.',
        cena: 'Pescado variado y marisco.',
        alternativas_comida: ['Sopa de menestra + ensalada de canónigos con tomate y aguacate']
      },
      {
        n: 7,
        desayuno: 'Igual.',
        mediaManana: 'Fruta.',
        comida: 'Conejo, pollo, pavo o pescado y judías verdes.',
        merienda: 'Fruta.',
        cena: 'Fruta.',
        alternativas_comida: ['Conejo/pollo/pavo/pescado + judías verdes']
      }
    ]
  },

  // ---------------------------------------------------------------
  // FASE 2: CLÁSICA 2013 — 14 SEMANAS
  // ---------------------------------------------------------------
  {
    id: 'clasica',
    nombre: 'Clásica (Dieta Disociada 2013)',
    tipo: 'clasica',
    detalle: '14 semanas de menú. Elige la semana activa y los días 1-7. Sigue las reglas de la dieta disociada (no mezclar hidratos con proteínas).',
    semanas: [
      // S1
      {
        semana: 1,
        titulo: '1ª Semana',
        desayunoBase: 'Café con leche desnatada o leche de soja. Dos rebanadas de pan integral con aceite de oliva y/o jamón serrano, york, pavo, atún...',
        mediaMananaBase: 'Embutido permitido en dieta, conserva de pescado o café con leche desnatada.',
        meriendaBase: 'Embutido de dieta, conserva de pescado, con infusión o refresco.',
        comidas: [
          'Sopa de picadillo (agua, sal, carnes de pollo/pavo/gallina y ternera y huesos, se cuece y con la carne cocida se hace picadillo con huevo duro y jamón). Gambas al ajillo y pescado a la plancha y ensalada de canónigos.',
          'Calamares a la plancha y pescado a la plancha, a la sal o al vapor. Ensalada de pepino.',
          'Pollo o conejo al ajillo con huevos fritos. Ensalada de lechuga con atún.',
          'Almejas salteadas o al vapor y parrillada de pescado. Ensalada de canónigos.',
          'Chuletillas de cordero a la plancha y ensalada de lechuga con atún y palitos de cangrejo.',
          'Sopa de marisco (sin arroz ni fideos) y entrecot de ternera y canónigos.',
          'Escarola con picadillo de ahumados y pescado asado.'
        ],
        cenas: [
          'Ensalada de lechuga con atún y tortilla francesa.',
          'Ternera al ajillo y endibias con plantas aromáticas maceradas en aceite.',
          'Pepino picado con anchoas o bonito, pinchitos de pollo y alitas fritas.',
          'Albóndigas fritas con salvado y ensalada de escarola.',
          'Huevos fritos con salchichas y jamón serrano y pepino.',
          'Ensalada de lechuga con palitos de cangrejo y gambas cocidas y lacón.',
          'Ahumados. Gulas al ajillo. Mejillones al vapor. Ensalada de endibias.'
        ]
      },
      // S2
      {
        semana: 2,
        titulo: '2ª Semana',
        desayunoBase: 'Café/descafeinado/té/infusiones con leche desnatada y edulcorante con dos rebanadas de pan dextrinado con aceite, jamón cocido, pechuga de pavo, atún, jamón serrano, salmón ahumado. Alternar.',
        mediaMananaBase: 'Algo de embutido de dieta, café, té o infusiones.',
        nota: 'Tomar la fruta indicada en la 1ª semana. Sistema de la 1ª semana + espinacas, acelgas, espárragos blancos y verdes, ajetes, cardos, borrajas. Medio kilo de queso de Burgos a la semana (8 tarritas), de postre, ensalada o desayuno. Mahonesa casera con vinagre de manzana.',
        comidas: [
          'Sopa de picadillo, calamares a la plancha o pulpo a la gallega, borrajas rehogadas.',
          'Cordero asado, espárragos blancos con mahonesa.',
          'Huevos rellenos con atún y mahonesa. Ensalada de lechuga.',
          'Entremeses de salmón ahumado y bacalao. Conejo al ajillo. Canónigos.',
          'Sopa de marisco y ternera frita con ajos. Cardos.',
          'Mejillones al vapor y pescado asado. Escarola.',
          'Revuelto de espinacas con huevo, jamón serrano, sepia a la plancha.'
        ],
        merienda: 'Café, descafeinado, té o infusiones y un trozo de queso blanco o jamón.',
        cenas: [
          'Boquerones en vinagre, ensalada de lechuga con atún, pescado cocido o asado.',
          'Pescado a la plancha o frito con salvado. Gambas cocidas o almejas. Pepino con atún o canónigos con atún.',
          'Bacalao al pil-pil. Espinacas rehogadas con gambas.',
          'Acelgas rehogadas y ternera frita.',
          'Ensalada de endibias y pescado frito con salvado.',
          'Ajetes revueltos con gambas y huevo. Salchichas de pollo o pavo.',
          'Pollo o pavo asado. Jamón o embutido de pavo. Canónigos.'
        ]
      },
      // S3
      {
        semana: 3,
        titulo: '3ª Semana',
        desayunoBase: 'Café/descafeinado/té/infusiones con leche desnatada y edulcorante con dos rebanadas de pan dextrinado con aceite, jamón cocido, pechuga de pavo, atún, jamón serrano, salmón ahumado, sardinas en aceite. Alternar.',
        mediaMananaBase: 'Algo de embutido de dieta, café, té, infusión, refresco light.',
        nota: 'Sistema 1ª semana + 2ª semana + setas, champiñón, calabacín y puerros. Medio kilo de queso de Burgos + yogures naturales desnatados edulcorados. Mahonesa casera.',
        comidas: [
          'Entrecot a la plancha con champiñón.',
          'Pollo al ajillo con acelgas rehogadas con jamón.',
          'Pescado a la plancha, asado o frito con salvado con guarnición de espárragos blancos o verdes.',
          'Calabacín rehogado y filetes a la plancha o crema de calabacín con puerro y quesitos.',
          'Sopa de picadillo y pollo asado y cardos rehogados.',
          'Espinacas rehogadas y pescado asado.',
          'Ensalada de cogollos con atún y huevo cocido y cordero asado.'
        ],
        merienda: 'Unos días yogur y otros queso blanco.',
        cenas: [
          'Anchoas. Pescado a la plancha. Salmón ahumado y ensalada de escarola.',
          'Entremeses de jamón serrano, york, pechuga de pavo, queso blanco, salmón ahumado, palito de pescado y salchichas light, canónigos.',
          'Tortilla francesa y filete a la plancha. Endibias.',
          'Boquerones en vinagre y fritura de pescado con salvado. Cogollos.',
          'Ensalada de lechuga con pescado a la plancha.',
          'Caldo o sopa de pollo. Tortilla de atún o jamón. Canónigos.',
          'Pescado hervido con palitos de cangrejo y gambas. Espárragos a la plancha.'
        ]
      },
      // S4
      {
        semana: 4,
        titulo: '4ª Semana',
        desayunoBase: 'Café descafeinado, té o infusiones con leche desnatada y edulcorante. Dos biscotes dextrinados con aceite, jamón cocido, embutido de pavo, atún, jamón serrano y salmón ahumado.',
        mediaMananaBase: 'Algo de embutido de dieta, café, té o infusiones (sin leche y sin pan).',
        nota: 'Frutas de dieta: sandía, melón, melocotón, nectarina, naranja, mandarina, kiwi, piña natural, manzana, mango, papaya, pera, fresa (150 g) y pomelo. NO: uvas, chirimoya, caquis, higos y plátano. Una pieza al día a media mañana o media tarde. Nunca de postre.',
        comidas: [
          'Lentejas con verduras, pollo, jamón. Ensalada.',
          'Albóndigas de ternera con salvado y espinacas.',
          'Revuelto de setas o champiñones. Pescado a la plancha.',
          'Cóctel de gambas con lechuga, palitos de cangrejo y mahonesa. Calamares o similar a la plancha.',
          'Sopa de picadillo. Carne o pescado a la plancha. Ensalada de canónigos.',
          'Almejas o mejillones al vapor. Pulpo o similar frito con salvado y pescado asado. Crema de calabacín con puerro y quesito.',
          'Pollo o conejo al ajillo con huevos fritos y ensalada.'
        ],
        merienda: '1 yogur natural desnatado edulcorado.',
        cenas: [
          'Jamón y queso blanco. Caldo de pollo, ensalada de lechuga con atún.',
          'Caldo de pollo. Carne o pescado. Endibias con queso de Burgos y salmón ahumado picadito.',
          'Fruta de la que permita la monitora.',
          'Boquerones en vinagre. Gambas. Pescado a la plancha. Espárragos.',
          'Fruta.',
          'Ensalada de lechuga con atún, huevo duro, gambas, palitos de cangrejo, anchoas. Pescado cocido o asado.',
          'Revuelto de espárragos y pollo a la plancha. Manzanas + pera.'
        ],
        frutaCenasMezclables: 'Para las cenas de fruta: papaya + mango + piña; o piña + mandarina + naranja + kiwi + granada + fresas. El resto de frutas sin mezclar, de un solo tipo.'
      },
      // S5
      {
        semana: 5,
        titulo: '5ª Semana',
        desayunoBase: 'Café con leche desnatada y edulcorante. Dos rebanadas de pan integral de dieta con aceite o jamón york o serrano.',
        mediaMananaBase: 'Coca-Cola light y berberechos, ahumados o atún.',
        meriendaBase: 'Jamón york, pavo o serrano.',
        nota: 'En ayunas: 2 kiwis y zumo de naranja. Soja/qu "queso de Burgos o de cabra fresco o mozzarella fresca. 5 yogures a la semana de postre, merienda, etc.',
        comidas: [
          'Espárragos a la plancha y brochetas de mero a la parrilla.',
          'Sopa de picadillo y ternera asada y calabacín a la plancha.',
          'Judías verdes y conejo al ajillo.',
          'Lentejas sin patatas ni zanahorias con pollo.',
          'Endibias con anchoas y merluza rebozada solo con huevo.',
          'Espinacas rehogadas y pollo asado.',
          'Fritura variada de pescado con salvado y escarola.'
        ],
        cenas: [
          'Pulpo a la gallega sin patatas y mejillones al vapor. Canónigos.',
          'Lubina y lechuga con palitos y atún.',
          'Queso de Burgos con 2 tomates, solo con atún o ventresca.',
          'Setas y gallo a la plancha.',
          'Naranja, kiwi, mandarina, fresas.',
          'Lacón y sepia a la plancha con mahonesa y canónigos.',
          'Piña.'
        ]
      },
      // S6
      {
        semana: 6,
        titulo: '6ª Semana',
        desayunoBase: 'Igual que la semana anterior.',
        mediaMananaBase: 'Igual que la semana anterior.',
        meriendaBase: 'Igual que la semana anterior.',
        nota: 'Tomates, judías verdes, lentejas. Dos cenas de fruta. Alcachofas y berenjenas nuevas. Pasta cocinada solo con verduras.',
        comidas: [
          'Lentejas con verduras y pollo o ternera con una punta de jamón (sin patata, sin zanahoria). Un yogur.',
          'Crema de calabacín o calabacín a la plancha y besugos a la espalda.',
          'Sopa de pescado, lubina a la sal con guarnición de champiñón.',
          'Pasta rehogada con ajo, perejil y cebolla. Ensalada de canónigos, pepino, cebolla, zanahoria cruda rallada, tomate rojo y rabanitos.',
          'Sopa de picadillo y pollo asado o a la plancha con berenjenas a la plancha.',
          'Alcachofas y ternera al ajillo.',
          'Chuletillas de cordero y espinacas rehogadas y gratinadas con mahonesa.'
        ],
        cenas: [
          'Ensalada de lechuga con atún, huevo cocido, palitos y gambas.',
          'Fruta (papaya + mango + piña).',
          'Judías verdes rehogadas con jamón y pulpo a la gallega.',
          'Mejillones al vapor, merluza al vapor con mahonesa y espárragos.',
          'Revuelto de setas con gambas y huevos.',
          'Fruta (fresas + naranja + piña + kiwi).',
          'Queso de Burgos y tomates rojos con sardinillas en aceite de oliva.'
        ]
      },
      // S7
      {
        semana: 7,
        titulo: '7ª Semana',
        desayunoBase: 'Café con leche desnatada y edulcorante. Dos rebanadas de pan integral de dieta con aceite o jamón york o serrano.',
        mediaMananaBase: 'Algo de embutido como el de la mañana.',
        meriendaBase: 'Yogur natural desnatado o queso.',
        nota: 'En ayunas: zumo de naranjas + 2 kiwis. 7 yogures a la semana de postre, merienda, etc. Brócoli y coliflor. Lentejas dos días (o un día lentejas y otro pasta). Sopa de verduras, menestra, pisto, verduras a la plancha, al horno, puré o ensalada. Ensalada de pimientos.',
        comidas: [
          'Lentejas con pollo o ternera (sin patata ni zanahorias) o pasta con verduras.',
          'Sopa de marisco y tortilla de gambas.',
          'Pollo al ajillo y ensalada de lechuga con atún.',
          'Estofado de ternera con alcachofas.',
          'Lentejas.',
          'Pescado hervido con gambas y ensalada de pimientos con atún.',
          'Verduras variadas a la plancha y setas, con pollo.'
        ],
        cenas: [
          'Queso de Burgos y pechuga de pavo a la plancha y caldo.',
          'Sopa de verduras y brócoli al vapor.',
          'Piña + papaya + mango.',
          'Sopa de picadillo y alitas de pollo fritas.',
          'Sopa de verdura y espárragos a la plancha.',
          'Lacón y sepia a la plancha con mahonesa y yogur.',
          'Peras + manzanas.'
        ]
      },
      // S8
      {
        semana: 8,
        titulo: '8ª Semana',
        desayunoBase: 'Café con leche y pan con aceite.',
        mediaMananaBase: '1 pieza de fruta.',
        meriendaBase: 'Piña.',
        nota: 'Lentejas. 2 días solo de verdura. 2 cenas de fruta.',
        comidas: [
          'Pasta con verduras y ensalada con canónigos y pimiento asado.',
          'Sopa de picadillo y emperador con ajos. Queso de Burgos.',
          'Judías verdes y chuletillas de cordero y yogur.',
          'Setas rehogadas o rebozadas con salvado y ternera a la plancha o al ajillo.',
          'Verduras y berenjenas a la plancha y arroz al ajillo.',
          'Crema de calabacín, puerros y pimientos asados con atún y huevos duros.',
          'Lentejas con ensalada.'
        ],
        cenas: [
          'Ensalada de lechuga con cebolla, tomate, espárragos y alcachofas.',
          'Acelgas rehogadas con jamón y trucha.',
          'Sopa de picadillo y tortilla francesa y canónigos con palitos.',
          'Fruta.',
          'Ensalada de verduras variadas y espárragos a la plancha.',
          'Endibias en ensalada con queso de Burgos y pescado a la plancha.',
          'Fruta.'
        ]
      },
      // S9
      {
        semana: 9,
        titulo: '9ª Semana',
        desayunoBase: 'Café con leche desnatada y edulcorante. Dos rebanadas de pan integral de dieta con aceite o jamón york o serrano.',
        mediaMananaBase: 'Algo de embutido como el de la mañana.',
        meriendaBase: 'Embutido, queso de Burgos o yogur.',
        nota: 'En ayunas: zumo de naranja o dos kiwis según estreñimiento. 7 yogures a la semana. 500 g de queso de Burgos. Lombarda, repollo, coles de Bruselas.',
        comidas: [
          'Berenjenas y pollo asado.',
          'Ensalada de endibias con palitos y conejo al ajillo.',
          'Merluza en salsa verde y mejillones al vapor y espárragos.',
          'Pavo a la plancha y pimientos asados.',
          'Lentejas y conejo al ajillo o ensalada.',
          'Lacón y acelgas.',
          'Repollo y salmón.'
        ],
        cenas: [
          'Ensalada de lechuga con pepino, tomate, cebolla, atún, huevo cocido y palitos de cangrejo.',
          'Fruta.',
          'Ensalada de tomate maduro con huevo y ventresca, atún o caballa.',
          'Ensalada de escarola y caballas al horno o fritas.',
          'Ensalada tibia de aguacate, tomate, pepino, espárragos y gambas.',
          'Cogollo de lechuga y ahumados variados. Tortilla francesa.',
          'Fruta.'
        ]
      },
      // S10
      {
        semana: 10,
        titulo: '10ª Semana',
        desayunoBase: 'Café con leche y pan con aceite.',
        mediaMananaBase: 'Manzana.',
        meriendaBase: 'Yogur o queso.',
        nota: 'En ayunas: zumo de naranja y 2 kiwis. Judías blancas, pasta, arroz o garbanzos con verduras. Lentejas. Dos cenas de fruta.',
        comidas: [
          'Acelgas rehogadas con jamón y cordero asado o a la plancha.',
          'Calabacín rehogado o en crema (con algo de nata si se quiere) y pollo.',
          'Espinacas y conejo al ajillo.',
          'Sardinas a la plancha y cogollo de lechuga salpicado de ahumados.',
          'Lentejas y pollo.',
          'Setas y chuletón de ternera.',
          'Judías blancas con verduras y ensalada variada.'
        ],
        cenas: [
          'Gallos fritos y ensalada de lechuga.',
          'Dorada al horno y endibias.',
          'Naranja + kiwi + mandarina + piña.',
          'Espárragos y pulpo o sepia.',
          'Escarola y tortilla de gambas.',
          'Pescadillas hervidas con marisco y ensalada de canónigos.',
          'Piña tropical.'
        ]
      },
      // S11
      {
        semana: 11,
        titulo: '11ª Semana',
        desayunoBase: 'Café con leche desnatada y dos rebanadas de pan de avena o dextrinado con aceite, ahumados, jamón o atún.',
        mediaMananaBase: 'Algo de embutido de dieta o conserva de pescado.',
        meriendaBase: 'Queso de Burgos o yogur natural desnatado con salvado de avena, o café con leche.',
        nota: 'En ayunas: zumo de naranja y dos kiwis.',
        comidas: [
          'Lentejas cocinadas con pollo o ternera y verduras. 1 yogur.',
          'Brócoli al vapor y filete de ternera asado o a la plancha.',
          'Judías verdes rehogadas con jamón y sardinas a la plancha o salmón.',
          'Spaghetti con ajo, cebolla, tomate y plantas aromáticas. Ensalada variada de verdura.',
          'Sopa de picadillo y emperador con ajos y canónigos.',
          'Endibias con anchoas o ventresca y pollo frito.',
          'Sopa de marisco y conejo al ajillo con alcachofas rehogadas.'
        ],
        cenas: [
          'Lechuga con atún y palitos de cangrejo. Tortilla francesa.',
          'Sopa de pescado y filetes de bacalao fresco al horno en cama de cebolla.',
          'Fruta: piña tropical o peras.',
          'Lechuga o escarola con taco de jamón york y de pechuga de pavo. Lacón.',
          'Acelgas y calamares a la plancha.',
          'Fruta: melón.',
          'Ensalada de canónigos y ahumados y queso de Burgos.'
        ]
      },
      // S12
      {
        semana: 12,
        titulo: '12ª Semana',
        desayunoBase: 'Como acostumbres.',
        mediaMananaBase: 'Fruta.',
        meriendaBase: 'Café con leche, embutido de dieta, yogur.',
        nota: '2 cenas de fruta.',
        comidas: [
          'Berenjenas rellenas y sopa de picadillo de pollo.',
          'Acelgas y huevos fritos con salchichas.',
          'Pasta al ajillo o acompañada de verduras salteadas. Ensalada variada de verdura.',
          'Judías verdes rehogadas con jamón y pavo estofado.',
          'Endibias con queso y chuletillas de cordero.',
          'Espinacas revueltas con huevo y gambas y chicharrillos fritos.',
          'Repollo o lombarda rehogados y pescado hervido con marisco. Arroz solo.'
        ],
        cenas: [
          'Fruta: kiwis y piña.',
          'Pepinos al eneldo y pescado al vapor o asado.',
          'Sopa de picadillo y hamburguesas y canónigos.',
          'Fruta: naranjas con fresas y piña.',
          'Sopa de picadillo y sepia al ajillo con champiñón a la plancha.',
          'Tomate + queso + anchoas o atún + aguacate.',
          'Lacón y pimientos asados. Yogur.'
        ]
      },
      // S13
      {
        semana: 13,
        titulo: '13ª Semana',
        desayunoBase: 'Como acostumbres.',
        mediaMananaBase: 'Fruta o embutido de dieta.',
        meriendaBase: 'Café con leche o yogur.',
        nota: 'Receta: berenjenas rellenas (asar partidas a la mitad, sacar la pulpa, rehogar con carne o pescado, rellenar, cubrir con mozzarella o mahonesa casera y gratinar).',
        comidas: [
          'Ensalada de lechuga con atún y palitos y merluza hervida con gambas y chirlas.',
          'Sopa de picadillo y conejo al ajillo con champiñón.',
          'Lentejas cocinadas con pollo y verduras. Ensalada de lechuga y canónigos.',
          'Ensalada de escarola con queso y ahumados y lubina o dorada a la sal.',
          'Alcachofas rehogadas y albóndigas con salvado y salsa de ajo, perejil y azafrán.',
          'Jamón con verduras o en puré con guisantes y ensalada variada de verduras (no poner vinagre en la comida con patatas).',
          'Sopa de marisco y pollo con pimientos.'
        ],
        cenas: [
          'Ensalada de frutas.',
          'Ensalada de cogollos con pimientos asados y gambas al ajillo.',
          'Calabacín a la plancha y tortilla francesa.',
          'Piña + papaya + mango.',
          'Ensalada de tomate con queso y ventresca.',
          'Peras + manzanas.',
          'Puerros al horno gratinados con mahonesa y boquerones.'
        ]
      },
      // S14
      {
        semana: 14,
        titulo: '14ª Semana',
        desayunoBase: 'Como acostumbres.',
        mediaMananaBase: 'Queso, yogur.',
        meriendaBase: 'Fruta.',
        comidas: [
          'Ensalada de lechuga, cebolla, pepino, escarola, canónigos y pimiento rojo aliñada con sal, aceite de oliva y SIN vinagre. Coliflor rehogada con patata hervida.',
          'Ensalada de tomate con cebolla y queso, ajo, perejil y orégano, y pimientos asados con atún y huevo cocido.',
          'Ensalada de cogollos con ajo, orégano y aceite. Macarrones integrales con salsa de tomate casera con albahaca.',
          'Ensalada de endibias y pollo asado.',
          'Alcachofas estofadas con ternera.',
          'Ensalada de lechuga y atún y cordero asado.',
          'Espárragos, calabacín, berenjenas, tomate, pimiento, cebolla y endibia a la plancha y tallarines fritos con brotes de soja (o arroz).'
        ],
        cenas: [
          'Acelgas rehogadas con ajo y jamón. Tortilla francesa.',
          'Sopa de verdura (sin patata ni zanahoria). Pechuga de pollo a la plancha.',
          'Piña tropical.',
          'Ensalada de lechuga con cebolla y pepino y salmón a la plancha.',
          'Espárragos y trucha frita.',
          'Manzanas + peras.',
          'Mero al horno y ensalada de lechuga y cebolla y atún.'
        ]
      }
    ]
  },

  // ---------------------------------------------------------------
  // FASE 3: MANTENIMIENTO
  // ---------------------------------------------------------------
  {
    id: 'mantenimiento',
    nombre: 'Mantenimiento (Tabla Disociada)',
    tipo: 'mantenimiento',
    detalle: 'Reglas de la dieta disociada: no mezclar hidratos de carbono con proteínas. Ambos grupos se pueden mezclar con ensaladas de vegetales crudos y verduras cocinadas.',
    reglas: [
      'Los hidratos de carbono y las proteínas NO se pueden mezclar.',
      'Los dos grupos se pueden mezclar con ensaladas de vegetales crudos y con verduras cocinadas.',
      'Las frutas se pueden mezclar teniendo en cuenta NO mezclar las muy dulces con las muy ácidas.',
      'Excepción: las sandías y melones NO se pueden mezclar con nada.',
      'Es importante que el 50% de lo que comes sea crudo (ayuda a la digestión por su riqueza en enzimas). Sobre todo en verano; en invierno haz lo que puedas.',
      'Las lentejas se pueden tomar con proteínas, igual que los guisantes y las habas.',
      'Si se quiere comer postre hay que diferenciar entre los dos grupos: en hidratos tomar manzana, kiwi, papaya; en proteínas tomar lácteos, piña.'
    ],
    grupos: {
      hidratos: ['Garbanzos', 'Judías pintas', 'Judías blancas', 'Pasta', 'Harinas', 'Panes', 'Fideos', 'Arroz', 'Calabaza', 'Patata', 'Zanahoria cocida', 'Castañas', 'Yuca'],
      proteinas: ['Carnes', 'Pescados', 'Huevos', 'Tofu', 'Seitán', 'Frutos secos crudos', 'Lácteos', 'Guisantes', 'Lentejas (con proteínas)'],
      verdurasCrudas: ['Zanahoria cruda', 'Lechuga', 'Escarola', 'Endibia', 'Canónigos', 'Cebolla', 'Cebollinos', 'Remolacha', 'Rábanos', 'Ajo', 'Tomate', 'Pepino', 'Aguacate', 'Brotes germinados', 'Espinacas', 'Col', 'Diente de león'],
      verdurasCocinadas: ['Acelgas', 'Espinacas', 'Ajetes', 'Espárragos', 'Cardos', 'Borrajas', 'Setas', 'Champiñón', 'Puerros', 'Cebollas', 'Calabacín', 'Judías verdes', 'Alcachofas', 'Berenjenas', 'Pimientos', 'Brócoli', 'Coliflor', 'Lombarda', 'Coles de Bruselas', 'Nabo', 'Romanesco']
    }
  }
],

// ---------------------------------------------------------------
// ALIMENTOS para el buscador (clasificación y permiso)
// tipo: 'hidrato' | 'proteina' | 'verdura' | 'fruta'
// permitido: true/false (respecto a la fase clásica 2013)
// ---------------------------------------------------------------
alimentos: [
  { n: 'Pollo', t: 'proteina', p: true, det: 'Permitido sin límite (excepto cerdo).' },
  { n: 'Pavo', t: 'proteina', p: true },
  { n: 'Ternera', t: 'proteina', p: true },
  { n: 'Cordero', t: 'proteina', p: true },
  { n: 'Buey', t: 'proteina', p: true },
  { n: 'Conejo', t: 'proteina', p: true },
  { n: 'Cerdo', t: 'proteina', p: false, det: 'No permitido en la 1ª semana.' },
  { n: 'Huevos', t: 'proteina', p: true, det: '5 huevos a la semana salvo patología hepática.' },
  { n: 'Pescado blanco', t: 'proteina', p: true },
  { n: 'Pescado azul', t: 'proteina', p: true },
  { n: 'Marisco', t: 'proteina', p: true },
  { n: 'Moluscos', t: 'proteina', p: true },
  { n: 'Pulpo', t: 'proteina', p: true },
  { n: 'Sepia', t: 'proteina', p: true },
  { n: 'Calamar', t: 'proteina', p: true },
  { n: 'Atún', t: 'proteina', p: true, det: 'Conservas en aceite o al natural.' },
  { n: 'Sardinillas', t: 'proteina', p: true },
  { n: 'Caballa', t: 'proteina', p: true },
  { n: 'Ventresca', t: 'proteina', p: true },
  { n: 'Anchoas', t: 'proteina', p: true },
  { n: 'Berberechos', t: 'proteina', p: true },
  { n: 'Almejas', t: 'proteina', p: true },
  { n: 'Ahumados', t: 'proteina', p: true },
  { n: 'Palitos de cangrejo', t: 'proteina', p: true },
  { n: 'Gulas', t: 'proteina', p: true },
  { n: 'Salmón ahumado', t: 'proteina', p: true },
  { n: 'Jamón serrano', t: 'proteina', p: true },
  { n: 'Jamón york', t: 'proteina', p: true },
  { n: 'Lacón', t: 'proteina', p: true },
  { n: 'Pechuga de pavo', t: 'proteina', p: true },
  { n: 'Salchichas de pollo', t: 'proteina', p: true },
  { n: 'Salchichas de pavo', t: 'proteina', p: true },
  { n: 'Queso de Burgos', t: 'proteina', p: true },
  { n: 'Queso blanco', t: 'proteina', p: true },
  { n: 'Queso de cabra', t: 'proteina', p: true },
  { n: 'Mozzarella', t: 'proteina', p: true },
  { n: 'Yogur natural desnatado', t: 'proteina', p: true },
  { n: 'Tofu', t: 'proteina', p: true },
  { n: 'Seitán', t: 'proteina', p: true },
  { n: 'Gambas', t: 'proteina', p: true },
  { n: 'Mejillones', t: 'proteina', p: true },
  { n: 'Chirlas', t: 'proteina', p: true },
  { n: 'Frutos secos crudos', t: 'proteina', p: true },
  { n: 'Lentejas', t: 'hidrato', p: true, det: 'Se pueden tomar con proteínas.' },
  { n: 'Guisantes', t: 'proteina', p: true, det: 'Se pueden tomar con proteínas.' },
  { n: 'Habas', t: 'proteina', p: true, det: 'Se pueden tomar con proteínas.' },
  { n: 'Garbanzos', t: 'hidrato', p: true },
  { n: 'Judías pintas', t: 'hidrato', p: true },
  { n: 'Judías blancas', t: 'hidrato', p: true },
  { n: 'Pasta', t: 'hidrato', p: true },
  { n: 'Macarrones', t: 'hidrato', p: true },
  { n: 'Spaghetti', t: 'hidrato', p: true },
  { n: 'Tallarines', t: 'hidrato', p: true },
  { n: 'Harinas', t: 'hidrato', p: true },
  { n: 'Panes', t: 'hidrato', p: true },
  { n: 'Pan integral', t: 'hidrato', p: true },
  { n: 'Pan dextrinado', t: 'hidrato', p: true },
  { n: 'Fideos', t: 'hidrato', p: true },
  { n: 'Arroz', t: 'hidrato', p: true },
  { n: 'Calabaza', t: 'hidrato', p: true },
  { n: 'Patata', t: 'hidrato', p: true, det: 'No en menús sin patata.' },
  { n: 'Zanahoria cocida', t: 'hidrato', p: true },
  { n: 'Castañas', t: 'hidrato', p: true },
  { n: 'Yuca', t: 'hidrato', p: true },
  { n: 'Lechuga', t: 'verdura', p: true, det: 'Verdura cruda.' },
  { n: 'Escarola', t: 'verdura', p: true, det: 'Verdura cruda.' },
  { n: 'Endibia', t: 'verdura', p: true, det: 'Verdura cruda.' },
  { n: 'Canónigos', t: 'verdura', p: true, det: 'Verdura cruda.' },
  { n: 'Cebolla', t: 'verdura', p: true },
  { n: 'Cebollinos', t: 'verdura', p: true },
  { n: 'Remolacha', t: 'verdura', p: true },
  { n: 'Rábanos', t: 'verdura', p: true },
  { n: 'Tomate', t: 'verdura', p: true },
  { n: 'Pepino', t: 'verdura', p: true },
  { n: 'Aguacate', t: 'verdura', p: true },
  { n: 'Brotes germinados', t: 'verdura', p: true },
  { n: 'Espinacas', t: 'verdura', p: true },
  { n: 'Col', t: 'verdura', p: true },
  { n: 'Diente de león', t: 'verdura', p: true },
  { n: 'Acelgas', t: 'verdura', p: true, det: 'Verdura cocinada.' },
  { n: 'Ajetes', t: 'verdura', p: true },
  { n: 'Espárragos', t: 'verdura', p: true },
  { n: 'Cardos', t: 'verdura', p: true },
  { n: 'Borrajas', t: 'verdura', p: true },
  { n: 'Setas', t: 'verdura', p: true },
  { n: 'Champiñón', t: 'verdura', p: true },
  { n: 'Puerros', t: 'verdura', p: true },
  { n: 'Calabacín', t: 'verdura', p: true },
  { n: 'Judías verdes', t: 'verdura', p: true },
  { n: 'Alcachofas', t: 'verdura', p: true },
  { n: 'Berenjenas', t: 'verdura', p: true },
  { n: 'Pimientos', t: 'verdura', p: true },
  { n: 'Brócoli', t: 'verdura', p: true },
  { n: 'Coliflor', t: 'verdura', p: true },
  { n: 'Lombarda', t: 'verdura', p: true },
  { n: 'Coles de Bruselas', t: 'verdura', p: true },
  { n: 'Nabo', t: 'verdura', p: true },
  { n: 'Romanesco', t: 'verdura', p: true },
  { n: 'Sandía', t: 'fruta', p: true, det: 'No se puede mezclar con nada.' },
  { n: 'Melón', t: 'fruta', p: true, det: 'No se puede mezclar con nada.' },
  { n: 'Melocotón', t: 'fruta', p: true },
  { n: 'Nectarina', t: 'fruta', p: true },
  { n: 'Naranja', t: 'fruta', p: true },
  { n: 'Mandarina', t: 'fruta', p: true },
  { n: 'Kiwi', t: 'fruta', p: true },
  { n: 'Piña natural', t: 'fruta', p: true },
  { n: 'Manzana', t: 'fruta', p: true },
  { n: 'Mango', t: 'fruta', p: true },
  { n: 'Papaya', t: 'fruta', p: true },
  { n: 'Pera', t: 'fruta', p: true },
  { n: 'Fresa', t: 'fruta', p: true, det: '150 g en la fase clásica.' },
  { n: 'Pomelo', t: 'fruta', p: true },
  { n: 'Granada', t: 'fruta', p: true },
  { n: 'Uvas', t: 'fruta', p: false, det: 'No permitidas en la 4ª semana en adelante.' },
  { n: 'Chirimoya', t: 'fruta', p: false, det: 'No permitida.' },
  { n: 'Cakis', t: 'fruta', p: false, det: 'No permitidos.' },
  { n: 'Higos', t: 'fruta', p: false, det: 'No permitidos.' },
  { n: 'Plátano', t: 'fruta', p: false, det: 'No permitido.' },
  { n: 'Café', t: 'verdura', p: true, det: 'Bebida permitida.' },
  { n: 'Té', t: 'verdura', p: true, det: 'Bebida permitida.' },
  { n: 'Infusiones', t: 'verdura', p: true, det: 'Bebida permitida.' },
  { n: 'Refresco light', t: 'verdura', p: true, det: 'Bebida permitida (cola light, Trina light...).' },
  { n: 'Agua', t: 'verdura', p: true, det: 'Mínimo 1,5 L al día.' }
],

// ---------------------------------------------------------------
// RECETAS extraídas de los PDFs
// ---------------------------------------------------------------
recetas: [
  { n: 'Sopa de picadillo', t: 'Cocido en agua (sal, carnes de pollo/pavo/gallina/ternera y huesos añejos o de jamón). Cuando el caldo esté blanco, hacer un picadillo con la carne cocida, huevo duro y jamón.' },
  { n: 'Merluza en salsa verde', t: 'Merluza, 3 dientes de ajo, 4 cucharadas de aceite de oliva, perejil, salvado, sal y en un vaso agua y vinagre de manzana a partes iguales hasta la mitad. Salar y rebozar el pescado con salvado, cribar muy bien. Dorar los ajos en aceite y freír el pescado. Espolvorear con perejil picado y bañar con el vinagre y el agua, dejar hervir y servir.' },
  { n: 'Ensalada tibia de aguacate', t: 'Después de hacer rodajas las verduras, colocar por encima los espárragos a la plancha y las gambas al ajillo. Sino aguacate, pon cogollos.' },
  { n: 'Berenjenas rellenas', t: 'Asar las berenjenas partidas a la mitad y sacar la pulpa. Rehogar la pulpa con carne o pescado. Rellenar y cubrir con queso mozzarella o mahonesa casera y gratinar.' },
  { n: 'Mahonesa casera (dieta)', t: 'Hacer mahonesa casera con vinagre de manzana.' },
  { n: 'Arroz al ajillo con manzanas', t: 'Al ajillo con manzanas crudas a la plancha. 250 g de arroz en crudo (fase desintoxicante, día 2).' }
],

// ---------------------------------------------------------------
// NOTAS MANUSCRITAS (OCR poco fiable — marcar [REVISAR])
// Estas notas se muestran en la app para que el usuario las confirme
// o corrija manualmente. La página 2 del Mantenimiento es casi totalmente
// manuscrita e ilegible por OCR.
// ---------------------------------------------------------------
notas: [
  { origen: 'Desintoxicante', pag: 1, texto: '[REVISAR] Nota manuscrita al inicio: "nesmal" (ilegible).' },
  { origen: 'Desintoxicante', pag: 1, texto: '[REVISAR] Día 3 comida: posible adición manuscrita "a la playa".' },
  { origen: 'Desintoxicante', pag: 1, texto: '[REVISAR] Día 5: ajustes manuscritos sobre pescado/gambas.' },
  { origen: 'Clásica 2013', pag: 2, texto: '[REVISAR] Anotaciones de tratamiento manuscritas al final de la página (ilegibles).' },
  { origen: 'Clásica 2013', pag: 5, texto: '[REVISAR] Día 7 cena: anotación "manzanas + pera" y otra ilegible.' },
  { origen: 'Clásica 2013', pag: 8, texto: '[REVISAR] Varias notas manuscritas en la parte inferior de la página (ilegibles).' },
  { origen: 'Clásica 2013', pag: 10, texto: '[REVISAR] Notas manuscritas sobre comidas con proteína y ensaladas (parcialmente legibles, revisar).' },
  { origen: 'Clásica 2013', pag: 12, texto: '[REVISAR] Anotaciones manuscritas junto a los menús (p.ej. "pollo frito", "aguacate").' },
  { origen: 'Mantenimiento', pag: 2, texto: '[REVISAR] Esta página es casi totalmente manuscrita e ilegible por OCR. Corregir a mano si se desea conservar.' }
]
};

// Nombres cortos de las fases
DIETA_DATA.faseLabel = function(faseId) {
  const f = DIETA_DATA.fases.find(x => x.id === faseId);
  return f ? f.nombre : faseId;
};

// Guardar a nivel global (compatibilidad navegador)
if (typeof window !== 'undefined') {
  window.DIETA_DATA = DIETA_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DIETA_DATA;
}
