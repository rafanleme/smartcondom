module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'bcd127',
  database: process.env.NODE_ENV === 'test' ? 'smartcondom_test' : 'smartcondom',
  // logging: false,
  define: {
    timestamp: true,
    underscored: true,
  }
}