import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`MySQL Connected: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    // Sync all models (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('All tables synced successfully.');
  } catch (error) {
    console.error('MySQL connection error:', error);
    process.exit(1);
  }
};

export default sequelize;
