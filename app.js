const dotenv = require('dotenv');
dotenv.config();

const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const sequelize    = require('./config/database.js');

const session = require('express-session');

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://0.0.0.0:3000'];
const allowedHeaders = ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Credentials'];
const corsOptions =
{
  origin: function (origin, callback) { if (!origin || allowedOrigins.includes(origin)) callback(null, true); else callback(new Error('Not allowed by CORS')); },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: allowedHeaders, credentials: true
};
app.use(cors(corsOptions));

app.use(express.static('public'));
app.use(session({ secret: 'sorian-editora', resave: false, saveUninitialized: false, cookie: { secure: false, maxAge: 1000 * 60 * 60 * 8 }}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => { console.log(`Servidor rodando na porta ${PORT}`); });

(async () => { try { await sequelize.authenticate(); console.log('Conexão com MySQL bem sucedida.'); } catch (error) { console.error('Falha ao conectar MySQL: ', error); }})();

function autenticado(req, res, next)  { if (req.session.usuario) { return next(); } return res.redirect('/login'); }

app.get('/login', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'login.html')); });
app.get('/', autenticado, (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });
app.get('/index', autenticado, (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });
app.get('/inicio', autenticado, (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

const routes = require('./routes');
app.use('/api', routes);

app.get('/api/session', (req, res) => 
{
  const usuario = req.session.usuario;
  if (!usuario) { return res.json({ logado: false }); }
  res.json({ logado: true, usuario: { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo } });
});

app.get('/api/logout', (req, res) => { req.session.destroy(err => { if (err) { return res.status(500).send('Erro ao fazer logout.'); } res.redirect('/login'); }); });

app.use((req, res) => { res.status(404).json({ error: 'Endpoint não encontrado.' }); });