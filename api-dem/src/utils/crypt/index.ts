// @ts-nocheck

import bcrypt from 'bcrypt';

const crypto = require('crypto');

export const random_sha1 = () => crypto.randomBytes(20).toString('hex');

export function hmac_sha1(string, key) {
  var hash, hmac;

  hmac = crypto.createHmac('sha1', key);
  hmac.write(string); // write in to the stream
  hmac.end(); // can't read from the stream until you call end()
  hash = hmac.read().toString('hex'); // read out hmac digest

  return hash;
}

export function uuid() {
  return crypto.randomUUID();
}

export function md5(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

export async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verify(password, hash) {
  hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');

  return await bcrypt.compare(password, hash);
}

export function generateRandomDigits(length) {
  const characters = '0123456789';

  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join('');
}
