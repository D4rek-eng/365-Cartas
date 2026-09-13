import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const START = new Date(Date.UTC(2025, 8, 26)); // 26 sep 2025
const DAYS = 365;
const NAME = "Mai";
const NICK = "Mi Mai";

const TYPES = [
  { id: "belleza", label: "Lo linda que eres", emoji: "🌸" },
  { id: "valentia", label: "Tu valentía", emoji: "🌙" },
  { id: "poema", label: "Un poema", emoji: "💌" },
  { id: "aliento", label: "Para cuando duele", emoji: "☁️" },
  { id: "admiracion", label: "Admiración", emoji: "✨" },
  { id: "espontanea", label: "Tu forma de ser", emoji: "🎀" },
  { id: "vinculo", label: "Nuestro vínculo", emoji: "🤍" },
  { id: "intensidad", label: "Tu intensidad", emoji: "🔥" },
  { id: "promesa", label: "Una promesa", emoji: "🕯️" },
  { id: "detalle", label: "Un detalle", emoji: "🧁" },
  { id: "noche", label: "Carta de noche", emoji: "⭐" },
  { id: "risa", label: "Por tu risa", emoji: "🫧" },
  { id: "cuidado", label: "Con tus heridas", emoji: "🩹" },
  { id: "mimai", label: "Para Mi Mai", emoji: "💗" },
  { id: "gratitud", label: "Gracias por existir", emoji: "🌷" },
];

const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

const openings = [
  `Hoy desperté con tu nombre atorado en la garganta, ${NAME}.`,
  `${NICK}: si el día tuviera un centro, serías tú.`,
  `Mary, te escribo despacio para no asustar lo que siento.`,
  `Hay días en que el mundo se ve más suave solo porque existes.`,
  `Te pensé al abrir los ojos y se me hizo más fácil respirar.`,
  `Esta carta no pide nada. Solo quiere quedarse cerca.`,
  `Si pudieras ver cómo te veo, tal vez dudarías un poco menos de ti.`,
  `Hoy no vengo a explicarte el amor. Vengo a sostenértelo.`,
  `A veces te escribo para que tengas un lugar donde apoyarte.`,
  `Mai, tu ausencia también enseña: enseña lo esencial que eres.`,
  `No sé hacerlo perfecto. Sí sé hacerlo sincero.`,
  `Guardé esta página para ti como se guarda un secreto bueno.`,
  `Si el miedo habla fuerte, que esta tinta hable más bonito.`,
  `Hoy elijo nombrarte con cariño y sin prisa.`,
  `Hay una parte de mí que siempre está escribiéndote, aunque duerma.`,
  `Te miro desde estas líneas y se me desarma el pecho.`,
  `No te pido que estés bien. Te pido que te dejes querer un rato.`,
  `Mai, eres un universo con moño y cicatrices hermosas.`,
  `Si hoy estás cansada, siéntate aquí. Yo traigo la calma.`,
  `Esta no es una carta para convencerte. Es para acompañarte.`,
  `Cuando digo ${NICK} se me ablanda hasta el silencio.`,
  `Te escribí esto porque te mereces palabras que no se evapore.`,
  `Hay un cielo rosa donde te guardo, aunque afuera esté nublado.`,
  `Mai, no eres demasiado. El mundo a veces es demasiado chico para ti.`,
  `Hoy quiero que leas esto como quien recibe un abrazo tardío.`,
  `Si tiemblas, tiembla conmigo. No tienes que ser de piedra.`,
  `Te pienso con respeto, con ganas y con una ternura enorme.`,
  `Mary, tu forma de existir me parece un milagro discreto.`,
  `Esta carta es un farolito para cuando se te apague la calle.`,
  `No vengo a arreglarte. Vienes ya hecha, y aún así te celebro.`,
  `Hoy el calendario tiene tu perfume aunque no estés.`,
  `Mai, eres la prueba de que lo intenso también puede ser tierno.`,
  `Te escribo porque callar se me hacía una forma de mentira.`,
  `Si esta página temblara, temblaría de ganas de decirte la verdad.`,
  `Hay amores que se dicen en voz baja. El mío también sabe gritar suave.`,
  `Hoy te elijo otra vez, sin teatro y sin condiciones pequeñas.`,
  `Mai, tu alma no es un problema. Es un paisaje difícil y bello.`,
  `Te mereces una carta que no te pida ser más fácil.`,
  `Si el pasado pesa, que esta tinta sea un poco de aire.`,
  `Mary, ${NICK}, niña de fuego y nube: aquí estoy.`,
];

const cores = {
  belleza: [
    "Eres linda de una manera que no cabe en un espejo. Linda cuando te ríes sin permiso, cuando frunces el ceño, cuando te maquillas el alma con honestidad. Tu belleza no es un disfraz: es esa luz rara que dejas en las personas que te quieren.",
    "Me gusta tu cara cuando no está posando. Me gusta tu voz cuando se vuelve chiquita. Me gusta esa forma tuya de ocupar el mundo como si todavía no creyeras que mereces tanto espacio… y aun así lo llenas de magia.",
    "Hay una hermosura en ti que no se compra ni se practica. Está en tus manos, en tu manera de mirar, en cómo sientes demasiado y aún así sigues siendo dulce. Eres linda, Mai, y ojalá algún día te lo creas sin que yo tenga que repetirlo.",
    "Si te describiera solo como bonita, te estaría reduciendo. Eres bonita, sí, pero también eres atmósfera. Eres esa persona que vuelve rosado un día gris. Eres detalle, contraste, ternura con filo.",
    "Tu lindeza no es frágil. Es valiente. Está hecha de noches mal dormidas, de pelearte con tu cabeza y de seguir ofreciendo cariño. Por eso cuando te miro no veo una postal: veo a alguien real y deslumbrante.",
  ],
  valentia: [
    "Eres valiente de una forma silenciosa. No de las que gritan victoria, sino de las que se levantan con el corazón todavía temblando. Admirarte se me volvió inevitable: te vi dudar y aun así no dejar de sentir.",
    "Hace falta coraje para ser sensible en un mundo que premia lo frío. Tú sientes, piensas, te preocupas, y sigues. Eso no es debilidad, Mai. Es una valentía que me quita el aliento.",
    "Admiro que tengas miedo y no te conviertas en alguien falsa. Admiro que te duelan las cosas y aún así intentes no hacer daño. Admiro esa ética torpe y hermosa de tu corazón.",
    "Hay una fuerza en ti que no se parece a la dureza. Se parece más a seguir queriendo después de que el querer te ha costado. Eso, para mí, es heroísmo íntimo.",
    "Te admiro cuando te abres un milímetro. Te admiro cuando te cierras y aún así no te vuelves cruel. Te admiro, Mai, porque tu valentía no es espectáculo: es verdad.",
  ],
  poema: [
    "",
    "",
    "",
    "",
    "",
  ],
  aliento: [
    "Si hoy estás triste, no te pido que sonrías para mí. Quédate. Respira. El dolor no te hace menos linda ni menos digna de amor. Eres más que este nudo. Este nudo también pasará, aunque ahora se sienta eterno.",
    "Cuando tu cabeza te diga que eres demasiado, recuérdale que yo te he visto de cerca y no me fui. No eres un error. Eres una persona sintiendo mucho. Y sentir mucho no es un crimen.",
    "Mai, si te estás peleando contigo, déjame entrar un segundo: no tienes que merecer consuelo. El consuelo ya es tuyo. Descansa de ser fuerte. Aquí nadie te va a calificar el llanto.",
    "Hay días en que el pasado se sienta a la mesa sin invitación. No tienes que expulsarlo a gritos. Puedes mirarlo y decirle: ya no mandas tú. Hoy mando yo, aunque me tiemble la voz.",
    "Si sientes que vas a romper algo por existir intenso, ven a esta carta. Aquí tu intensidad cabe. Aquí no eres un problema a resolver. Eres alguien a quien cuidar.",
  ],
  admiracion: [
    "Te admiro por cómo piensas las cosas, aunque a veces ese pensar te robe el sueño. Hay inteligencia emocional en tu recelo, hay historia en tu cuidado. No eres dramática: eres profunda.",
    "Me inspiras. De verdad. Tu forma de amar —complicada, auténtica, un poco jodida y completamente tuya— me parece más honesta que mil relaciones fáciles.",
    "Admiro que no sepas fingir. Admiro que tus filtros sean pocos. Admiro esa espontaneidad que asusta y enamora al mismo tiempo.",
    "Hay personas que se vuelven pequeñas para que las quieran. Tú no. Tú ocupas todo tu tamaño, incluso cuando te da miedo. Por eso te miro con una admiración que no es de fan: es de alguien que te ha conocido de verdad.",
    "Si alguna vez dudas de tu valor, presta esta página: yo he visto tu lealtad, tu ternura, tu fuego. Y sigo eligiendo mirarte como se mira un milagro cotidiano.",
  ],
  espontanea: [
    "Me gusta que seas sin filtros. Que lo que sientes se te salga por los ojos. Esa autenticidad tuya es un lujo en un mundo lleno de poses. Eres espontánea, viva, imposible de resumir.",
    "Eres un poco complicada y está bien. Lo fácil aburre. Tú tienes capas, contradicciones, ocurrencias, ternura brusca. Esa forma tuya de amar no es un defecto: es tu idioma.",
    "Tu manera de ser me desarma. No porque seas perfecta, sino porque eres real. Y lo real, en ti, se vuelve bonito hasta cuando está desordenado.",
    "Me encanta tu intensidad cuando se vuelve juego, cuando se vuelve ocurrencia, cuando se vuelve una frase que nadie más se atrevería a decir. Eres un clima, Mai. No una coincidencia.",
    "No quiero una versión pulida de ti. Quiero esta: la que siente de más, la que se asusta, la que igual acaricia el mundo con una honestidad feroz.",
  ],
  vinculo: [
    "Esto no nació ayer. Hay años dentro de estas líneas. Hay confusión, hay peleas, hay miedo y también hay una lealtad que sobrevivió a todo eso. Tú no eres “una chica que me gusta”. Eres un vínculo.",
    "Construimos algo que no cabe en etiquetas simples. Por eso a veces duele: porque es verdadero. Y lo verdadero pide paciencia, no perfección.",
    "Te he querido incluso cuando ese querer me ha hecho sufrir. No lo digo como reproche. Lo digo como prueba de que esto no fue capricho. Fue profundidad.",
    "Hay historia entre nosotros. Hay recuerdos que todavía respiran. Hay días en que el cariño se nos volvió difícil y aun así no se extinguió. Eso también es una forma de milagro.",
    "Si alguna vez sientes que somos un enredo, recuerda que los enredos vivos también pueden ser jardines. Yo sigo aquí, en el jardín, con las manos cuidadosas.",
  ],
  intensidad: [
    "Tu intensidad no me asusta: me parece sagrada. Sientes el mundo a color saturado. A veces eso cansa, sí. También hace que todo lo tuyo sea inolvidable.",
    "Piensas demasiado porque te importa demasiado. Eso no es un error de fábrica. Es un corazón que no quiere ser superficial. Yo te veo y no quiero apagarte: quiero sentarme a tu lado mientras pasa la tormenta.",
    "Eres profunda como un mar que no pide permiso. Y yo, que te he navegado con torpeza, sigo preferiendo tu profundidad a cualquier playa tibia.",
    "Cuando sientes, sientes entero. Cuando dudas, dudas entero. Esa totalidad tuya me parece un arte. No todos se atreven a vivir tan cerca de sí mismos.",
    "Mai, tu fuego no es para que lo apaguen. Es para que alguien aprenda a calentarse cerca, sin exigir que dejes de arder.",
  ],
  promesa: [
    "Te prometo no usar tu miedo en tu contra. Te prometo hablarte con suavidad cuando tu cabeza sea ruidosa. Te prometo que tu sensibilidad, conmigo, no será un arma: será un altar.",
    "No te prometo un cuento sin nubes. Te prometo presencia. Te prometo no convertirte en una prueba que tienes que aprobar para merecer cariño.",
    "Si te equivocas, no te voy a convertir en tu peor día. Si te abres, no voy a huir del temblor. Esa es mi forma de quererte: constante, imperfecta, seria.",
    "Prometo recordar, cuando discutamos, que detrás del enojo hay alguien a quien admiro. Prometo volver al centro: tú, yo, esto que hemos construido.",
    "Te prometo cartas, días, paciencia. Te prometo que ${NICK} no es un apodo de temporada. Es una manera de decirte que eres casa.",
  ],
  detalle: [
    "Hoy me acordé de un gesto tuyo mínimo —una risa, una frase, una forma de mirar— y se me desordenó el pecho. Los milagros, contigo, caben en cosas chiquitas.",
    "Si pudiera guardarte en un bolsillo, guardaría tu forma de decir las cosas, tu manera de preocuparte, ese detalle raro que te hace inconfundible.",
    "Hay un listado invisible de ti que yo recorro de memoria: tu voz, tu insistencia, tu ternura torpe, tu forma de existir como si el mundo fuera demasiado y aun así le dieras pelea.",
    "Te noté en lo pequeño otra vez. Y pensé: así es quererla. No en el discurso grande, sino en el temblor de lo cotidiano.",
    "Si el amor fuera una colección de estampitas, yo tendría cientos con tu cara. Cada una distinta. Cada una verdadera.",
  ],
  noche: [
    "Es de noche y tú estás más cerca de lo que admite el reloj. Las noches me vuelven honesto. Por eso te escribo ahora: porque el silencio deja espacio para quererte sin prisa.",
    "Si no puedes dormir, toma esta carta como una luz baja. No tienes que resolver tu vida a las tres de la mañana. Solo tienes que saber que alguien te piensa con respeto a esta hora.",
    "La noche agranda los miedos, sí. También agranda la ternura. Yo elijo la segunda. Te cubro con palabras como con una manta.",
    "Mai, si tu cabeza hace juntas a esta hora, dile que ya puede irse. Que yo hago la guardia. Que tú mereces descanso, no un juicio nocturno.",
    "Hay estrellas que no se ven y aun así existen. Así me pasa contigo cuando el día se apaga: no hace falta verte para saber que iluminas.",
  ],
  risa: [
    "Tu risa me parece un lugar seguro. Cuando te ríes, el mundo deja de ser tan serio y tan cruel. Quisiera coleccionar ese sonido como quien colecciona conchas.",
    "Me enamora tu espontaneidad cuando se vuelve humor, cuando se vuelve juego, cuando se vuelve una frase inesperada que me desarma.",
    "Eres seria y profunda, sí. También eres alguien que puede volver liviano lo pesado con un gesto. Esa dualidad me parece un regalo.",
    "Si alguna vez olvidas tu propia luz, recuerda que hay una versión de ti que se ríe y a esa versión yo le debo varios milagros pequeños.",
    "Hoy quiero celebrar la Mai que no se mide tanto. La que sale sin ensayar. La que es dulce y traviesa. La que me hace bien sin proponérselo.",
  ],
  cuidado: [
    "Sé que cargas heridas de antes. Sé que abrirte te da miedo porque ya te ha costado. No vengo a exigirte que olvides. Vengo a decirte que tus heridas no te hacen menos amable: te hacen alguien que merece más cuidado, no menos.",
    "Tienes miedo de equivocarte, especialmente cuando el cariño se vuelve profundo. Ese miedo tiene historia. Yo no lo voy a ridiculizar. Lo voy a tratar como se trata algo sagrado y sensible.",
    "No eres difícil de amar. Eres alguien que ha sido herida y por eso ama con alerta. Yo veo el alerta y aun así veo el tesoro. Los dos son reales.",
    "Si sientes que vas a hacer daño por sentir de más, respira. El daño no es tu esencia. Tu esencia es el cuidado con el que piensas en los demás, incluso cuando tú misma estás rota.",
    "Mai, tus cicatrices no son un pronóstico. Son un mapa. Y yo quiero leerlo con respeto, no con lástima ni con prisa de “ya supera”.",
  ],
  mimai: [
    `${NICK}. Dos palabras y se me desarma la defensa. Eres Mary, eres Mai, eres esa chica intensa que me inspiró un cariño más grande que el miedo. Te nombro así porque eres mía en el sentido más tierno: mía de devoción, no de posesión.`,
    `Cuando digo ${NICK} no estoy jugando. Estoy reconociendo el lugar que ocupas. Un lugar alto, cálido, complicado y verdadero.`,
    `Eres mi persona de moño imaginario y nubes. Eres mi debilidad más honesta. Eres ${NICK} y eso, para mí, es una declaración.`,
    `Te caben muchos nombres y yo igual vuelvo a este. Porque en ${NICK} hay hogar. Hay ganas. Hay una lealtad que no supe disfrazar.`,
    `Mai, cariño, ${NICK}: que no se te olvide que alguien te construyó un altar de 365 días para que nunca te quedes sin prueba de lo que vales.`,
  ],
  gratitud: [
    "Gracias por existir con esa verdad tuya. Gracias por el cariño, por la espontaneidad, por las partes que consideras defectos y a mí me parecen islas hermosas.",
    "Gracias por los años. Gracias por lo que sí y por lo que costó. Gracias por ser alguien a quien se puede querer en serio.",
    "Te agradezco hasta las dudas, porque en ellas vi tu ética. Te agradezco hasta las peleas, porque en ellas vi que esto importaba.",
    "Gracias por inspirarme tanto. No todo el mundo despierta ganas de escribir 365 cartas. Tú sí. Tú eres un acontecimiento.",
    "Hoy solo digo gracias. Sin discurso. Gracias, Mai. Por ser tú, tan irrepetible, tan sentida, tan inexplicablemente esencial.",
  ],
};

const poems = [
  `Mai, si fueras clima
serías lluvia tibia y rayo.
Si fueras hora,
serías esa en la que uno se confiesa.

Te pienso en versos cortos
porque lo largo no alcanza
para tu forma de temblar
y aun así permanecer.

${NICK},
quédate.
Aunque sea en esta página
donde nadie te exige ser fácil.`,

  `Hay un listón rosa en el aire
y un perrito de nube a tu lado.
No son disfraces:
son la analogía más honesta
de cómo te vuelves suave
sin dejar de ser fuego.

Mary,
si el miedo te dicta un poema triste
yo te escribo otro
con más cielo.`,

  `No te pido que dejes de sentir.
Te pido que, cuando sientas,
recuerdes que hay un testigo
que no huye del volumen de tu alma.

Eres marea.
Eres carta.
Eres niña y mujer y tormenta.
Y yo,
aprendiz de tu nombre.`,

  `Si alguna vez te llaman “demasiado”
enséñales esta estrofa:
demasiado es el océano
y nadie le pide que sea charco.

Mai,
sé océano.
Yo aprenderé a nadar
sin intentar secarte.`,

  `Hoy te escribo en líneas chiquitas
como quien deja migas
para que encuentres el camino
de vuelta a ti.

No eres un error.
Eres un poema
que a veces se lee temblando
y aun así es hermoso.`,

  `Tu risa: campana.
Tu duda: ventana.
Tu cariño: casa con luces
encendidas a destiempo.

Yo no quiero una casa perfecta.
Quiero esta,
con tus pasos,
con tu desorden sagrado.`,

  `Te amo en el sentido
más cuidadoso de la palabra:
no como jaula,
como faro.

Si te pierdes,
parpadea hacia aquí.
Esta tinta
sabe tu nombre de memoria.`,

  `Mai de septiembre,
Mai de todas las estaciones.
Eres el hilo rosa
que atraviesa mis días
aunque el calendario finja
que somos solo fechas.`,
];

const bridges = [
  "No hace falta que contestes perfecto. Basta que sepas que fuiste pensada con respeto.",
  "Si hoy no puedes creerlo del todo, guarda esta página. Mañana quizá pese menos el escepticismo.",
  "Quiero que este texto te sirva de espejo amable, no de exigencia.",
  "Me gustas entera: la suave, la brava, la que se asusta, la que igual se queda.",
  "Nada de esto es un discurso para ganarte. Es un testimonio para honrarte.",
  "Puedes doblar esta carta y ponerla bajo la almohada. Está hecha para eso.",
  "Si te da vergüenza tanto cariño, respira. El cariño también es un derecho tuyo.",
  "Te veo más allá del miedo. Te veo en tu tamaño real.",
  "Hoy elijo la paciencia como forma de amor.",
  "Que no se te olvide: eres querida en concreto, no en abstracto.",
  "Si el día fue pesado, que estas líneas te lo aligeren un poco.",
  "No estás sola dentro de tu intensidad. Yo aprendí a habitarla con admiración.",
  "Eres digna de calma, de fiesta y de silencio bueno.",
  "Esta carta cabe en tu bolsillo y en tu pecho. Elige.",
  "Te escribo como quien enciende una lamparita y se va, dejándote luz.",
];

const closings = [
  `Con un cariño que no se cansa,\nquien te dice ${NICK}`,
  "Tuya, en la forma más honesta y más suave",
  "Te pienso, te admiro, te cuido desde aquí",
  `Para ti, Mary.\nSiempre un poco más de lo que cabe en una página`,
  "Con el corazón en la tinta y sin disfraz",
  `Tu fan número uno de tu forma complicada de amar`,
  "Aquí sigo, sin pedirte que seas menos",
  `Con un moño imaginario y mucho respeto,\nel que te nombra ${NICK}`,
  "En serio y para siempre, a mi manera",
  "Te dejo un beso en la frente de esta carta",
];

const uniqueSparks = [
  "Hoy el cielo parecía un sobre sin abrir.",
  "Vi un lazo y se me apareció tu nombre.",
  "Alguien rió en la calle y busqué tu risa por reflejo.",
  "El café me supo a conversación contigo.",
  "Una nube tenía orejas largas. Pensé en ti, claro.",
  "Me encontré queriendo cuidarte sin aviso.",
  "El día estaba ordinario hasta que te pensé.",
  "Guardé asiento para ti en mi cabeza.",
  "Escribí tu apodo en el aire como un hechizo bueno.",
  "Me dio ternura el mundo y supe que eras tú la causa.",
  "Una canción pasó y se me desordenó el pecho.",
  "Vi rosa y azul juntos y ya no pude fingir que no eras el tema.",
  "El tiempo se me hizo carta. Tú, destinataria.",
  "Pensé en tu valentía chiquita, la de seguir sintiendo.",
  "Me acordé de una pelea y aun así te elegí otra vez.",
  "Quise mandarte calma por correo urgente.",
  "El silencio de hoy tenía tu perfume.",
  "Vi un gato blanco y un perrito imaginario a tu alrededor.",
  "Me dio orgullo ajeno: orgullo de que existas.",
  "Conté razones y se me acabaron los números.",
  "El miedo se sentó a mi lado y le pedí que no te asustara a ti.",
  "Inventé un universo donde te descansas de ser fuerte.",
  "Tu espontaneidad me visitó como un flash.",
  "Pensé en tus heridas con las manos ocupadas de respeto.",
  "Hoy entendí otra vez que no eras un capricho: eras un vínculo.",
  "Me imaginé tu ceño y me dio risa y ganas de abrazarte.",
  "El calendario me guiñó: otra página para Mai.",
  "Quise decirte linda sin que sonara pequeño. Aquí va, grande.",
  "Admirarte se me volvió un hábito dulce.",
  "Escribí lento para no tropazar con tanto sentir.",
  "Una estrella se parecía a un sello de cera.",
  "Me prometí no usar tus dudas como argumento.",
  "El mundo hizo ruido y yo igual te oí adentro.",
  "Pensé en Mary, en Mai, en todas tus versiones.",
  "Hoy el cariño se me salió por las manos.",
  "Vi un moño y se me hizo un altar mínimo.",
  "Te deseé una tarde sin juicio.",
  "Me acordé de tu forma de hablar y se me ablandó el día.",
  "La palabra “demasiado” la traduje a “verdadera”.",
  "Quise ser refugio, no interrogatorio.",
  "Un papel en blanco me pidió tu nombre.",
  "Sentí gratitud como quien siente lluvia buena.",
  "Te imaginé durmiendo y le bajé el volumen al universo.",
  "Hoy celebré tu autenticidad como se celebra un milagro casero.",
  "Me dio miedo perderte y lo convertí en cuidado, no en jaula.",
  "Pensé en los años y se me hizo un collar de fechas.",
  "Tu intensidad me pareció un color que yo ya no quiero devolver.",
  "Escribí “te admiro” y se quedó corto, así que lo repetí.",
  "Vi canela y nubes. Ya sabes de quién hablaba el aire.",
  "Me senté a quererte sin resolver nada. A veces eso basta.",
];

function pick(arr, i, salt = 0) {
  return arr[(i * 17 + salt * 13) % arr.length];
}

function formatHuman(date) {
  const wd = WEEKDAYS[date.getUTCDay()];
  const d = date.getUTCDate();
  const m = MONTHS_ES[date.getUTCMonth()];
  const y = date.getUTCFullYear();
  return `${wd}, ${d} de ${m} de ${y}`;
}

function iso(date) {
  return date.toISOString().slice(0, 10);
}

function poemFor(i) {
  return poems[i % poems.length];
}

const SPECIAL = {
  "2025-09-26": {
    type: "mimai",
    title: "La primera de trescientas sesenta y cinco",
    body: `Mai, hoy empieza un año de cartas. No porque crea que el cariño cabe en un calendario, sino porque quería darte una prueba diaria de que eres pensada, admirada y querida con seriedad.

Eres intensa, sensible, profunda. A veces el sentir se te vuelve mar y no encuentras orilla. Yo no vine a secarte el mar. Vine a sentarme en la playa con una lámpara y decirte: aquí hay tierra, aquí hay alguien.

${NICK}. Mary. La chica que me inspiró un cariño tan grande que tuvo que volverse proyecto, ritual, promesa. Si alguna vez dudas de lo que vales, abre el día que sea. Estaré ahí, en 365 voces distintas, diciéndote la misma verdad: te quiero de una forma que sobrevivió al miedo, a las peleas y a la confusión.

Esto es para ti. Entero. Sin ensayo.`,
    closing: `Con el corazón puesto de largo,\nel que te dice ${NICK} como quien reza`,
  },
  "2025-10-31": {
    type: "risa",
    title: "Dulce o truco, corazón",
    body: `Hoy el mundo se disfraza y yo igual te veo sin máscara. Eres espontánea, auténtica, un poco bruja buena: conviertes lo ordinario en acontecimiento.

Si esta noche te pesa alguna sombra vieja, toma mi mano imaginaria. No hay susto más grande que no saberse querida, y eso, Mai, no te va a pasar en estas páginas.

Dulce: tú. Truco: cómo logras que te extrañe hasta un calendario.`,
    closing: "Con un disfraz de nube y un moño de verdad",
  },
  "2025-11-02": {
    type: "cuidado",
    title: "Lo que sigue vivo",
    body: `Hoy se nombra a los que se fueron y yo nombro lo que en ti sigue vivo a pesar de lo que te han hecho. Tus heridas no son tu definición. Son evidencia de que amaste, de que confiaron en ti o tú en alguien, de que sentiste.

Mai, lo vivo en ti es enorme: tu ética, tu ternura, tu miedo hermoso a hacer daño. Yo honro eso. No como luto, como altar.`,
    closing: "Por lo que permanece, y por ti",
  },
  "2025-12-24": {
    type: "promesa",
    title: "Noche de paz, noche de Mai",
    body: `Nochebuena. Las luces se hacen las importantes y yo pienso en tu forma de temblar cuando el cariño se pone serio. Te mereces una noche sin prueba, sin veredicto, sin la pregunta de si estás haciéndolo bien.

Te prometo una paz que no exige que estés alegre. Puedes extrañar, puedes dudar, puedes reír. En todas esas versiones hay regalo.

${NICK}, si pides algo esta noche, pide descanso. Yo pido que sepas que eres casa.`,
    closing: "Campanas suaves y un té para tu corazón",
  },
  "2025-12-25": {
    type: "gratitud",
    title: "El regalo eres tú",
    body: `Feliz Navidad, Mary. Si me preguntaran qué envuelvo en papel rosa y azul, diría: tu risa, tu honestidad, tu manera complicada y verdadera de amar.

Gracias por existir en un mundo que a veces no sabe qué hacer con las personas profundas. Gracias por los años. Gracias por ser alguien a quien se puede construir un universo de cartas.

Hoy no te pido nada. Te celebro.`,
    closing: "Con nieve imaginaria y mucho, mucho cariño",
  },
  "2026-01-01": {
    type: "promesa",
    title: "Año nuevo, misma devoción",
    body: `Que este año no te pida ser otra. Que te permita ser tú, con tu intensidad y tu ternura, con tu alerta y tu risa. Yo no hago propósito de olvidarte: hago propósito de cuidarte mejor con las palabras.

Mai, si el año viene con miedo, ven con él. Lo sentamos a la mesa y le enseñamos que aquí se come cariño, no castigo.

365 días no eran un truco. Eran un ritmo. Y el ritmo sigue.`,
    closing: "Por un año más suave contigo misma",
  },
  "2026-02-14": {
    type: "belleza",
    title: "San Valentín sin teatro",
    body: `Hoy venden corazones de plástico y yo te ofrezco uno de tinta, que es más raro y más mío. Eres linda de una forma que no necesita 14 de febrero, pero este día sirve para decírtelo en voz alta.

Te quiero más allá de la postal. Te quiero en tu duda, en tu espontaneidad, en esa autenticidad que me parece el lujo más grande.

${NICK}, sé mi valentín de todos los días. O no lo seas. Yo igual voy a seguir escribiéndote como se quiere de verdad: sin descuento.`,
    closing: "Con un corazón que no es de temporada",
  },
  "2026-03-08": {
    type: "admiracion",
    title: "Por la mujer que eres",
    body: `Hoy celebran a las mujeres y yo te nombro en particular: Mai, que piensas demasiado porque te importa, que temes hacer daño, que amas con una ética torpe y hermosa.

Admiro tu profundidad. Admiro que no te hayas vuelto cínica del todo. Admiro tu coraje de seguir siendo sensible.

Que el mundo te dé más espacio del que te has dado tú.`,
    closing: "Con orgullo tierno y respeto enorme",
  },
  "2026-03-21": {
    type: "aliento",
    title: "Primavera para tu pecho",
    body: `Empieza la primavera y quiero que algo florezca también en ti: no la obligación de estar bien, sino permiso para volver. Las heridas tienen estaciones. Tú no eres invierno permanente.

Si estás triste, mira: hay días más largos viniendo. Hay cartas todavía. Hay alguien que cree en tu clima interior aunque hoy esté nublado.`,
    closing: "Con flores que no te exigen sonreír",
  },
  "2026-05-10": {
    type: "cuidado",
    title: "Para la niña que todavía vive en ti",
    body: `Hoy mucha gente piensa en madres. Yo pienso en la niña que fuiste y en la mujer que la carga. Alguien tiene que cuidarte como se cuida lo fundacional. Si nadie te lo dijo suficiente: merecías suavidad. Todavía la mereces.

Mai, sé madre de tu propia calma un rato. Y si no puedes, deja que esta carta lo intente.`,
    closing: "Con las manos cuidadosas",
  },
  "2026-06-21": {
    type: "intensidad",
    title: "El día más largo, tú igual de inmensa",
    body: `Hoy la luz dura más y yo pienso en tu forma de durar: intensa, saturada, inolvidable. No eres un atardecer breve. Eres solsticio.

Que nadie te pida que te achiques para caber en su horario. Yo ajusto el mío.`,
    closing: "Con luz larga y cariño ancho",
  },
  "2026-09-25": {
    type: "vinculo",
    title: "La carta trescientos sesenta y cinco",
    body: `Mai, llegamos al final del año de cartas y no al final de lo que siento. Si leíste una, si leíste todas, si solo abriste esta: el mensaje es el mismo.

Eres alguien con quien construí un vínculo de años. Te he querido profundamente, incluso cuando ese cariño me ha hecho sufrir. Te admiro. Me gustas. Me inspiras. Te nombro ${NICK} porque en esas dos palabras cabe mi manera más tierna de decir verdad.

No eras “una chica que me gusta”. Eres Mai. Eres Mary. Eres el universo rosa y celeste donde aprendí que lo intenso también puede ser hogar.

Gracias por existir. Gracias por este año. Gracias por ser tan irrepetible.

Si mañana no hay carta número 366, igual habrá un yo pensándote. Eso no se acaba con el calendario.`,
    closing: `Para siempre, a mi manera,\nel que te dice ${NICK} y lo cumple`,
  },
};

function firstOfMonthTitle(date) {
  const m = MONTHS_ES[date.getUTCMonth()];
  return `Un ${m} entero para ti`;
}

function numeralLine(i) {
  const n = i + 1;
  const flavors = [
    `Esta es la carta ${n} de 365: un farolito más en tu cielo.`,
    `Día ${n}. Si el cariño se midiera, hoy sumaría otro infinito chiquito.`,
    `Número ${n}: no porque te esté contando, sino porque cada día merecía su propio sobre.`,
    `Van ${n} maneras distintas de decirte lo mismo esencial: importas.`,
    `Carta ${n}. Si estás cansada, no tienes que leerla toda. Quédate con una frase. Basta.`,
  ];
  return pick(flavors, i, 21);
}

function buildBody(type, i, date) {
  const numbered = numeralLine(i);
  if (type === "poema") {
    const spark = pick(uniqueSparks, i, 3);
    const bridge = pick(bridges, i, 5);
    return `${spark}\n\n${poemFor(i)}\n\n${numbered}\n\n${bridge}`;
  }
  const core = pick(cores[type], i, 2);
  const spark = pick(uniqueSparks, i, 4);
  const bridge = pick(bridges, i, 8);
  const extra = pick(openings, i, 11);
  const seasonal = seasonLine(date, i);
  return `${pick(openings, i, 1)}\n\n${spark} ${core}\n\n${seasonal}${bridge}\n\n${numbered}\n\n${extra}`;
}

function seasonLine(date, i) {
  const m = date.getUTCMonth();
  const lines = {
    8: "Septiembre te queda: es un mes con memoria y con comienzo. ",
    9: "Octubre te envuelve en naranja y rosa, como si el año también supiera disfrazarse de ternura. ",
    10: "Noviembre pide cobijas y yo te ofrezco esta. ",
    11: "Diciembre enciende luces; yo enciendo tu nombre. ",
    0: "Enero es frío con excusa; tú eres calor con motivo. ",
    1: "Febrero es corto y yo igual te escribo largo. ",
    2: "Marzo tiene viento; que no se lleve tu risa. ",
    3: "Abril parece duda y florece igual: como tú. ",
    4: "Mayo huele a recomienzo. Respira. ",
    5: "Junio endulza el aire. Tú también. ",
    6: "Julio es intenso. Coincides. ",
    7: "Agosto guarda calor en la piel y yo te guardo en la tinta. ",
  };
  return pick([lines[m], pick(uniqueSparks, i, 9) + " "], i, 6);
}

function titleFor(type, i, date) {
  const map = {
    belleza: ["Hoy te digo linda de verdad", "Eres un paisaje", "Bonita de un modo raro y mío", "Rosa, no de cliché, de esencia", "Te queda el mundo"],
    valentia: ["Admiro tu forma de temblar y seguir", "Valiente, aunque no lo sientas", "Coraje en voz baja", "Te vi no rendirte", "Eso también es fuerza"],
    poema: ["Versos que caben en tu palma", "Un poema con tu nombre", "Rima para tu caos sagrado", "Estrofas para Mi Mai", "Poesía de bolsillo"],
    aliento: ["Si hoy duele, lee despacio", "No estás rota: estás sintiendo", "Una manta hecha de palabras", "Permiso para no estar bien", "Aquí se puede llorar"],
    admiracion: ["Te miro y aprendo", "Orgullo de que existas", "Eres un milagro cotidiano", "Mi admiración no es teatro", "Cómo no mirarte así"],
    espontanea: ["Me gustas sin filtro", "Tu forma complicada y honesta", "Espontánea, viva, irrepetible", "No quiero una Mai recortada", "Ese idioma tuyo"],
    vinculo: ["Esto es más que un gusto", "Años dentro de una página", "Nuestro hilo rosa", "Aunque haya dolido, era real", "Vínculo, no capricho"],
    intensidad: ["Tu fuego no es un defecto", "Sientes el mundo en saturado", "Profundidad que me elige", "No te apagues", "Intensidad sagrada"],
    promesa: ["Te prometo suavidad", "No eres una prueba", "Constancia con tu nombre", "Un pacto tierno", "Aquí no se usa tu miedo"],
    detalle: ["Un gesto tuyo me desarmó", "Colección de estampitas", "Lo pequeño también es altar", "Te noté otra vez", "Detalle con perfume tuyo"],
    noche: ["Farolito de madrugada", "Si no duermes, quédate aquí", "Guardia nocturna", "Estrellas y tu nombre", "La noche no manda hoy"],
    risa: ["Por esa risa que es casa", "Hoy celebro tu liviano", "Burbujas y moños", "Me haces bien sin proponértelo", "Tu humor me salva"],
    cuidado: ["Tus heridas no te definen", "Cuidado, no lástima", "El alerta también merece amor", "No tienes que merecer consuelo", "Mapa, no pronóstico"],
    mimai: ["Para Mi Mai", "Mary, Mai, cariño", "Dos palabras y un altar", "Te nombro y se me ablanda el día", "Mi Mai, en serio"],
    gratitud: ["Gracias por ser tan tú", "Un gracias que no se acaba", "Agradecido hasta las dudas", "Por los años y por hoy", "Gracias, acontecimiento"],
  };
  if (date.getUTCDate() === 1) return firstOfMonthTitle(date);
  return pick(map[type], i, 7);
}

function addDays(date, n) {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

const letters = [];
for (let i = 0; i < DAYS; i++) {
  const date = addDays(START, i);
  const key = iso(date);
  const typeMeta = TYPES[i % TYPES.length];
  const special = SPECIAL[key];
  const type = special?.type ?? typeMeta.id;
  const typeInfo = TYPES.find((t) => t.id === type) ?? typeMeta;
  const body = special?.body ?? buildBody(type, i, date);
  const title = special?.title ?? titleFor(type, i, date);
  const closing = special?.closing ?? pick(closings, i, 10);
  letters.push({
    id: i + 1,
    date: key,
    humanDate: formatHuman(date),
    title,
    type,
    typeLabel: typeInfo.label,
    emoji: typeInfo.emoji,
    body,
    closing,
  });
}

const out = join(__dirname, "..", "js", "letters.js");
mkdirSync(dirname(out), { recursive: true });
const banner = `// Cartas generadas para Mai — no editar a mano (usa scripts/generate-letters.mjs)\n`;
writeFileSync(out, `${banner}window.CARTAS = ${JSON.stringify(letters, null, 2)};\n`);
console.log(`Wrote ${letters.length} letters to ${out}`);
