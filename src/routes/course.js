const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/courses', courseController.index);
router.get('/courses/create', courseController.create);
router.post('/courses/create', courseController.store);
router.post('/courses/actionCourseId', courseController.actionCourseId);
router.get('/courses/:slug', courseController.show);
router.get('/courses/:id/edit', courseController.edit);
router.put('/courses/:id', courseController.update);
router.delete('/courses/:id', courseController.delete);
router.get('/trash/courses', courseController.trash);
router.patch('/courses/:id/restore', courseController.restore);
router.delete('/courses/:id/force', courseController.force);
router.get('/', courseController.home);

module.exports = router;
