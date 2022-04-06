const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
module.exports = {
  paypal: {
    businessEmail: '',
    url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
    currency: 'TRY',
  },
  secret: 'LotusAliMineNaber',
  name: 'nodeStore',
  db: {
    url: DB,
    sessions: 'MySessions',
  },
  locale: {
    lang: 'tr-TR',
    currency: 'TRY',
  },
};
