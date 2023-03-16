import express from 'express';

import { get_acronym, create_acronym, delete_acronym, update_acronym } from '../controllers/methods.js';

const router = express.Router();

// GET /acronym?page=1&limit=10&search=:search
// Search from all the values and returns the matching result with search key.
// If more results exists it is mentioned in response header.
router.get('/', get_acronym);

// POST /acronym
// Create new Acronyms and save it to Database
router.post('/', create_acronym);

// PATCH /acronym/:acronymID
// Update existing Acronyms in the Database
router.patch('/:acronymID', update_acronym);

// DELETE /acronym/:acronymID
// Deletes acronyms from the Database of given ID
router.delete('/:acronymID', delete_acronym);

export default router;