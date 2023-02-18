import { defineEventHandler } from 'h3';
import { promises as fs } from 'fs';

export default defineEventHandler(async () => await fs.readFile('./api/data.json'));
