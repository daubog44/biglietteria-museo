import mysql from "mysql2/promise";


export const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'biglietteria',
    password: "example",
  });


/*export const getAllOfBigliettiVisite = async () => {
    try {
        const [results] = await connection.query(
          'SELECT tariffa, titolo, giorno_acquisto  FROM `biglietto` AS B INNER JOIN `visita` AS V ON V.biglietto = B.id WHERE B.is_base = 1'
        );
      
        console.log(results);
      } catch (err) {
        console.log(err);
      }
}*/

export const getAllCategories = async (): Promise<{results?: any, err?: Error}> =>  {
    try {
        const [results] = await connection.query(
          'SELECT * FROM `categoria`'
        );
      
        return {results};
      } catch (err) {
        return {err: err as Error};
      }
}

export const getAllEsposizioni = async (): Promise<{results?: any, err?: Error}> =>  {
    try {
        const [results] = await connection.query(
          'SELECT * FROM `esposizione`'
        );
      
        return {results};
      } catch (err) {
        return {err: err as Error};
      }
}

export const getCatById = async (id: number): Promise<{results?: any, err?: Error}> =>  {
  try {
      const [results] = await connection.query(
        `SELECT * FROM 'categoria' WHERE id = ${id}`
      );
    
      return {results};
    } catch (err) {
      return {err: err as Error};
    }
}

export const getEspById = async (id: number): Promise<{results?: any, err?: Error}> =>  {
  try {
      const [results] = await connection.query(
        `SELECT * FROM 'esposizione' WHERE id = ${id}`
      );
    
      return {results};
    } catch (err) {
      return {err: err as Error};
    }
}

export const getEsposizioniByYear = async (year: string): Promise<{results?: any, err?: Error} | undefined>  => {
  if (!(Number(year) && year.length === 4)) return;
  try {
    const [results] = await connection.query(
      `SELECT titolo, tariffa, inizio, fine FROM esposizione as E WHERE E.inizio >= '${year}-01-01' AND E.fine <= '${year}-12-31'`
    );
  
    return {results};
  } catch (err) {
    return {err: err as Error};
  }
}

export const getRicavatoDiEsposizioneById = async (id: number): Promise<{results?: any, err?: Error}> => {
  try {
    const [results] = await connection.query(
      `SELECT tariffa, inizio, fine, sconto, descrizione, giorno_acquisto FROM esposizione AS E INNER JOIN biglietto AS B ON E.codice = B.esposizione INNER JOIN categoria AS C ON C.id = B.categoria WHERE E.codice = ${id}`
    );
    return {results};
  } catch (err) {
    return {err: err as Error};
  }
}

export const getBigliettiByDay = async (day: Date): Promise<{results?: any, err?: Error}> => {
  try {
    const [results] = await connection.query(
      `SELECT * from biglietto WHERE giorno_acquisto = "${day.toJSON().slice(0, 10)}"`
    );
  
    return {results};
  } catch (err) {
    return {err: err as Error};
  }
}