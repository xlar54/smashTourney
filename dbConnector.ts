import pg from 'pg';

const{Pool} = pg;

export default class dbConnector{

    pool:any = {Pool}; 

    constructor (user:string, password:string, host:string, port:number, database:string) {
    this.pool =  new Pool({
        user: `${user}`,
        password: `${password}`,
        host: `${host}`,
        port: port,
        database: `${database}`
    });
}

    query (text:any, params:any){
    try {
        return this.pool.query(text, params)
    }
    catch (error){
        console.error('dbConnector.ts line 23: failure to connect to pool');
    }
}

}



