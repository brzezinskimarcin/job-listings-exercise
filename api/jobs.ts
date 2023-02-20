import { promises as fs } from 'fs';
import { defineEventHandler } from 'h3';

export default defineEventHandler(() => fs.readFile('./api/data.json'));
