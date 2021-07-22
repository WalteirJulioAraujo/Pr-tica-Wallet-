import connection  from "../database";

export async function createEvent(user,value,type){
    return await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3) RETURNING *`,
        [user.id, value, type]
    );
}

export async function searchEvent(user){
    const result = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [user.id]
    );
    return result.rows;
}