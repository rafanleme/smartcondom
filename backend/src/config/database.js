module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'xxxxxx',
  database: process.env.NODE_ENV === 'test' ? 'smartcondom_test' : 'smartcondom',
  logging: false,
  define: {
    timestamp: true,
    underscored: true,
    logging: false,
  }
}