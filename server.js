const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const studentSchema = new mongoose.Schema({
  phone: String,
  password: String,
  age: Number,
  address: String,
  bio: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);

Student.create({
  phone: '1234567890',
  password: 'securepassword',
  age: 25,
  address: '123 Main St, City',
  bio: 'متعلم متحمس',
});

Course.create({
  name: 'الفرنساوي',
  description: 'دورة رياضيات متقدمة',
});

// تعريف نقاط النهاية
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("الخادم يعمل على المنفذ" ${PORT});
});