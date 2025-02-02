import db from '../config/Database.js'
import User from './UserModel.js'
import Product from './ProductModel.js'

(async () => {
    try {
        await db.authenticate();
        console.log("Database connected...");
        await db.sync();
    } catch (error) {
        console.error("Database connection error:", error);
    }
})();

export { db, User, Product };
