//import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Student = require('./models/Student');
const app = express();


//Database connections

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/application');
mongoose.connection.on('connected', () =>{
    console.log('Database is connected');
})
mongoose.connection.on('error', () =>{
    console.log('Error occured');
})

//middleware
app.use(cors())
app.use(express.json())

//routes
app.get('/', (req,res) =>{
    Student.find()
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err =>{
        res.status(500).send(err);
    })
})
app.post('/students',(req,res) =>{
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    const student = new Student({
        _id : new mongoose.Types.ObjectId,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        place: req.body.place
    }) ;
    student.save()
    .then(result =>{
        console.log(result);
        res.status(200).json({msg:"successfully inserted"})
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({msg:"Error occured"});
    })
   
})

app.delete('/students/:id', (req,res) =>{
    const id = req.params.id;
    Student.remove({_id:id}, (err,result) => {
        if(err){
            console.log(err);
            res.status(500).send('error occured');
        }
        else{
            res.status(200).json({msg:'Successfully deleted'});
        }
    })
})

app.put('/students/:id', (req,res) =>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const place =req.body.place;
    const id = req.params.id;
    Student.update({_id:id},{$set:{firstname:firstname, lastname:lastname, place: place}})
    .then(result =>{
        console.log(result);
        res.status(200).json({msg:'successfully updated'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'error occured'})
    })
})

//server
app.listen(5000,() =>{
    console.log('Server is connected')
})