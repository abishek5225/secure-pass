import { drizzle } from "drizzle-orm/singlestore";
import { Pool } from "pg";
import * as schema from './schema'

const pool= new Pool({
    
})

export const db = drizzle(pool, {schema})