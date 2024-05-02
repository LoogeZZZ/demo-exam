import pool from "../database.js";

class User {
	static async createInstance(userData) {
		const connection = await pool.getConnection();

		try {
			const queryString = `
                INSERT INTO user (id_role, full_name, email, password, phone, driver_license)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

			const {
				id_role,
				full_name,
				email,
				password,
				phone,
				driver_license,
			} = userData;

			await connection.query(queryString, [
				id_role,
				full_name,
				email,
				password,
				phone,
				driver_license,
			]);

			console.log("Создан новый пользователь");
		} catch (error) {
			console.error(
				`Произошла ошибка при создании нового пользователя: ${error}`
			);
		} finally {
			connection.release(); // Возвращаем соединение в пул
		}
	}

	static async getUserByEmail(email) {
		const connection = await pool.getConnection();

		try {
			const queryString = `
				SELECT * FROM user
				WHERE email = ?
			`;

			const result = await connection.query(queryString, [email]);

			return result[0];
		} catch (error) {
			console.error(
				`Произошла ошибка при получении пользователя по email: ${error}`
			);
		} finally {
			connection.release(); // Возвращаем соединение в пул
		}
	}

	static async checkUser(email, password) {
		const connection = await pool.getConnection();

		try {
			const queryString = `
				SELECT EXISTS (
					SELECT 1
					FROM user
					WHERE email = ? AND password = ?
				) AS user_exists;
			`;

			const result = await connection.query(queryString, [
				email,
				password,
			]);

			return result[0];
		} catch (error) {
			console.error(
				`Произошла ошибка при авторизации пользователя: ${error}`
			);
		} finally {
			connection.release(); // Возвращаем соединение в пул
		}
	}
}

export default User;
