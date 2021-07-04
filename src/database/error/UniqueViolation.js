import DatabaseError from './DatabaseError.js';

export default class UniqueViolation extends DatabaseError {}

DatabaseError.define('23505', UniqueViolation);
