const Course = require('../models/Course');

class CourseController {
    // [GET] / home
    home(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('courses', { courses });
            })
            .catch(next);
    }

    // [GET] / courses
    index(req, res, next) {
        let courses = Course.find({});
        Promise.all([
            courses.sortable(req).lean(),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) => {
                res.render('courses/index', { courses, deletedCount });
            })
            .catch(next);
    }

    // [GET] / courses/slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                res.render('./courses/show', { course });
            })
            .catch(next);
    }

    // [GET] / courses/create
    create(req, res) {
        res.render('./courses/create');
    }

    // [POST] / courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hq720.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => {
                res.redirect('/courses');
            })
            .catch(next);
    }

    // [GET] / courses/id
    edit(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .lean()
            .then((course) => {
                res.render('courses/edit', { course });
            })
            .catch(next);
    }

    // [PUT] / courses/id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/courses');
            })
            .catch(next);
    }

    // [DELETE] / courses/id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => {
                res.redirect('/courses');
            })
            .catch(next);
    }

    // [GET] / trash/courses
    trash(req, res, next) {
        let courses = Course.findDeleted();
        courses
            .sortable(req)
            .lean()
            .then((courses) => {
                res.render('courses/trash', { courses });
            })
            .catch(next);
    }

    // [Patch] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .lean()
            .then(() => {
                res.redirect('/trash/courses');
            })
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    force(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .lean()
            .then(() => {
                res.redirect('/trash/courses');
            })
            .catch(next);
    }

    // [actionCourseId] /courses/:id/force
    actionCourseId(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseId } })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseId } })
                    .lean()
                    .then(() => {
                        res.redirect('/trash/courses');
                    })
                    .catch(next);
                break;
            case 'force':
                Course.deleteMany({ _id: { $in: req.body.courseId } })
                    .lean()
                    .then(() => {
                        res.redirect('/trash/courses');
                    })
                    .catch(next);
                break;
            default:
                res.json('Error');
        }
    }
}

module.exports = new CourseController();
