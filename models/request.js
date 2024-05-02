import pool from "../database.js";

class RequestModel {
	static async getRequestData() {
		let conn;
		try {
			conn = await pool.getConnection();
			const rows = await conn.query(`
                SELECT
                    request.id,
                    user.full_name AS user_name,
                    user.phone AS user_phone,
                    user.email AS user_email,
                    car.name AS car_model,
                    status.name AS status_name,
                    request.booking_date
                FROM
                    request
                JOIN
                    user ON request.id_user = user.id
                JOIN
                    car ON request.id_car = car.id
                JOIN
                    status ON request.id_status = status.id
            `);
            
			console.log(rows);
			return rows;
		} catch (error) {
			console.error(`Произошла ошибка при выполнении запроса: ${error}`);
			throw error;
		} finally {
			if (conn) conn.end();
		}
	}
}

export default RequestModel;
