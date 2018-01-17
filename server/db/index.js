const Sequelize = require('sequelize');

const inthestudio = new Sequelize('inthestudio', 'anr', 'wakalaka', {
  host: 'inthestudio.chfewwwsv5ni.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

inthestudio.authenticate()
.then(() => {
console.log('Connected to InTheStudioDB');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

module.exports = {
	inthestudio
}
