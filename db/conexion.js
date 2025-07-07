import {Sequelize} from "sequelize";
const  database ="talento_humano-db";
const username = "postgres";
const password = "12345";
const host = "localhost";
const port = "5432";

export const sequelize = new Sequelize(database, username,password,{
    host:host,
    dialect: 'postgres',
    port : port,
});
