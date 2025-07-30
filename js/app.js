// — Views & navigation —
const views = {
  login:     document.getElementById('view-login'),
  register:  document.getElementById('view-register'),
  home:      document.getElementById('view-home'),
  translate: document.getElementById('view-translate')
};
function show(view) {
  Object.values(views).forEach(v => v.style.display = 'none');
  views[view].style.display = 'block';
}

// — Storage & Auth —
let users = JSON.parse(localStorage.getItem('tvUsers')||'[]');
const saveUsers = () => localStorage.setItem('tvUsers', JSON.stringify(users));

// — Register logic —
document.getElementById('register-form').onsubmit = e => {
  e.preventDefault();
  const first = document.getElementById('reg-firstname').value.trim();
  const last  = document.getElementById('reg-lastname').value.trim();
  const u     = document.getElementById('reg-username').value.trim();
  const p     = document.getElementById('reg-password').value;
  if (users.some(x => x.user === u)) { alert('Ese usuario ya existe'); return; }
  users.push({ user: u, pass: p, first, last });
  saveUsers();
  alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
  show('login');
};

// — Login logic —
document.getElementById('login-form').onsubmit = e => {
  e.preventDefault();
  const u = document.getElementById('login-username').value.trim();
  const p = document.getElementById('login-password').value;
  const found = users.find(x => x.user === u && x.pass === p);
  if (!found) { alert('Usuario o contraseña inválidos'); return; }
  localStorage.setItem('tvCurrent', JSON.stringify(found));
  updateProfile();
  show('home');
};

// — Actualizar perfil —
function updateProfile() {
  const current = JSON.parse(localStorage.getItem('tvCurrent'));
  if (current) {
    document.getElementById('profile-name').innerText = `${current.first} ${current.last}`;
    document.getElementById('profile-name-translate').innerText = `${current.first} ${current.last}`;
  }
}

// — Top nav —
document.getElementById('to-register').onclick    = e => { e.preventDefault(); show('register'); };
document.getElementById('to-login').onclick       = e => { e.preventDefault(); show('login'); };
document.getElementById('start-translate').onclick = () => show('translate');
document.getElementById('backHome').onclick        = e => { e.preventDefault(); show('home'); };
['login','register','home','translate'].forEach(name => {
  const el = document.getElementById(`nav-${name}`);
  if (el) el.onclick = e => { e.preventDefault(); show(name); };
});

// --- Traducciones ---
const translations = {
  es: {
    flag: "🇪🇸 ES",
    loginTitle: "Iniciar Sesión",
    langQuestion: "¿Cuál es tu idioma?",
    username: "Usuario",
    password: "Contraseña",
    loginBtn: "Entrar",
    noAccount: "¿No tienes cuenta? <a href='#' id='to-register'>Regístrate</a>",
    registerTitle: "Crear Cuenta",
    name: "Nombre",
    lastname: "Apellido",
    regBtn: "Registrar",
    yesAccount: "¿Ya tienes cuenta? <a href='#' id='to-login'>Inicia sesión</a>",
    homeWelcome: "Bienvenido a Creole",
    homeSubtitle: "Rompe la barrera del idioma entre español y créole haitiano.",
    startBtn: "Comenzar",
    textTranslation: "Traducción de Texto",
    voiceTranslation: "Traducción de Voz",
    textIn: "Español",
    textOut: "Créole haitiano",
    backHome: "← Volver al Inicio"
  },
  ht: {
    flag: "🇭🇹 HT",
    loginTitle: "Antre nan Kont",
    langQuestion: "Ki lang ou pale?",
    username: "Itilizatè",
    password: "Modpas",
    loginBtn: "Antre",
    noAccount: "Ou pa gen kont? <a href='#' id='to-register'>Enskri</a>",
    registerTitle: "Kreye Kont",
    name: "Non",
    lastname: "Siyati",
    regBtn: "Enskri",
    yesAccount: "Ou deja gen kont? <a href='#' id='to-login'>Antre</a>",
    homeWelcome: "Byenvini nan TraduVoz",
    homeSubtitle: "Kraze baryè lang ant panyòl ak kreyòl ayisyen.",
    startBtn: "Kòmanse",
    textTranslation: "Tradiksyon Tèks",
    voiceTranslation: "Tradiksyon Vwa",
    textIn: "Panyòl",
    textOut: "Kreyòl ayisyen",
    backHome: "← Tounen Lakay"
  }
};

let currentLang = localStorage.getItem('appLang') || 'es';
window.appLang = currentLang;

// --- Aplicar traducción ---
function applyTranslations() {
  const t = translations[window.appLang];
  document.getElementById("login-title").innerHTML = t.loginTitle;
  document.getElementById("lang-question").innerHTML = t.langQuestion;
  document.getElementById("login-user-label").innerHTML = t.username;
  document.getElementById("login-pass-label").innerHTML = t.password;
  document.getElementById("login-btn").innerHTML = t.loginBtn;
  document.getElementById("no-account").innerHTML = t.noAccount;
  document.getElementById("register-title").innerHTML = t.registerTitle;
  document.getElementById("reg-name-label").innerHTML = t.name;
  document.getElementById("reg-lastname-label").innerHTML = t.lastname;
  document.getElementById("reg-user-label").innerHTML = t.username;
  document.getElementById("reg-pass-label").innerHTML = t.password;
  document.getElementById("reg-btn").innerHTML = t.regBtn;
  document.getElementById("yes-account").innerHTML = t.yesAccount;

  document.querySelector("#view-home h2").innerHTML = t.homeWelcome;
  document.querySelector("#view-home p").innerHTML = t.homeSubtitle;
  document.getElementById("start-translate").innerHTML = t.startBtn;
  document.getElementById("text-translation-title").innerHTML = t.textTranslation;
  document.getElementById("voice-translation-title").innerHTML = t.voiceTranslation;
  document.getElementById("text-in").placeholder = t.textIn;
  document.getElementById("text-out").placeholder = t.textOut;
  document.getElementById("backHome").innerHTML = t.backHome;

  document.getElementById("lang-switch").innerHTML = t.flag;
}

// --- Botones de idioma ---
document.getElementById('lang-es').onclick = () => {
  window.appLang = 'es'; localStorage.setItem('appLang', 'es'); applyTranslations();
};
document.getElementById('lang-ht').onclick = () => {
  window.appLang = 'ht'; localStorage.setItem('appLang', 'ht'); applyTranslations();
};
document.getElementById('lang-switch').onclick = () => {
  window.appLang = (window.appLang === 'es') ? 'ht' : 'es';
  localStorage.setItem('appLang', window.appLang);
  applyTranslations();
};

// — Inicialización de vista al cargar —
window.onload = () => {
  users.length ? show('login') : show('register');
  applyTranslations();
  updateProfile();
};

// — Traducción de texto —
const dictText = { "Hola amigo haitiano": "Bonjou zanmi ayisyen" };
document.getElementById('btn-text').onclick = () => {
  const inp = document.getElementById('text-in').value.trim();
  document.getElementById('text-out').value = dictText[inp] || "Bonjou zanmi ayisyen";
};

// — Traducción de voz —
const dictVoice = { "Hola amigo mexicano": "Bonjou zanmi meksiken" };
const outArea = document.getElementById('voice-out');
document.getElementById('btn-voice').onclick = () => {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) { alert('Tu navegador no soporta reconocimiento de voz'); return; }
  const recog = new SpeechRec();
  recog.lang = 'es-ES';
  recog.onresult = evt => {
    const text = evt.results[0][0].transcript;
    const tr = dictVoice[text] || "Hola amigo mexicano";
    outArea.value = tr;
    const utt = new SpeechSynthesisUtterance(tr);
    utt.lang = window.appLang === 'es' ? 'es-ES' : 'ht';
    speechSynthesis.speak(utt);
  };
  recog.start();
};
speechSynthesis.onvoiceschanged = () => { speechSynthesis.getVoices(); };
