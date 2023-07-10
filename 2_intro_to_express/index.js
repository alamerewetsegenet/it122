import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.set('view engine', 'ejs');

const students = [
    {name: "Daria", major: "science", id: 1},
    {name: "Alfred", major: "economics", id: 2},
]

app.get('/', (req, res) => {
    console.log(req.url)
    res.render('home', {students});
});
app.get('/students/:id', (req, res) => {
    let student = students.find(students => student.id == req.params.id)
    if (student) {
      res.send(`Info for student: ${student.name}`);
    }
    res.send(`Info for student: ${req.params.id} not found`);
});
app.get('/about', (req, res) => {
    console.log(req.url)
    res.send('This class is about making great web sites');
});
app.use((req,res) => {
    res.status(404)
    res.send('404 -Not found');


});

