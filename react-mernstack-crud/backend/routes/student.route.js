// CREATE Student
const router = require("express").Router()
const Student = require("../Models/Student")
router.route('/create-student').post(async (req, res, next) => {
    const newStudent = new Student({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })

    const result = await newStudent.save()
    res.json(result)
});
router.post('/students', (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    });
    newStudent.save()
        .then(() => res.json('Student added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



// READ Students
router.route('/').get(async (req, res) => {
    const students = await Student.find()
    res.json(students)
})

// Get Single Student
router.route('/edit-student/:id').get((req, res) => {
    Student.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Student
router.route('/update-student/:id').put((req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Student updated successfully !')
        }
    })
})

// Delete Student
router.route('/delete-student/:id').delete(async(req, res, next) => {
    try{
        const result = await Student.findByIdAndDelete(req.params.id)
        res.json(result)
    }catch (e) {
        res.status(400).json(e)
    }
})

module.exports = router;