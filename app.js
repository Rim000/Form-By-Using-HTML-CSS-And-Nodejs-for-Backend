//express module importing..
const express =require("express");
const app= express();
const port =80;
const path=require("path");
// fs se file ma write krna tha tw isko import kia --->tut74
const fs =require("fs");

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //FOR serving static files
app.use(express.urlencoded()); 

//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views',path.join(__dirname,'views')); //set the views directory 

//ENDPOINTS
app.get('/',(req,res)=>{
    const con="This is the best content on the internet so far so use it wisely"
    const parms={'title':'pubg is the best game', "content":con}
    res.status(200).render('index.pug' , parms);
})
app.post('/', (req,res)=>{
    // console.log(req.body);
    //data yahan ayega then output.txt ma safe hojayga ------>ye kaam tut74 ma kia humne
    //jo bh data user form se enter karega wo output.txt ma ajayga-------> tut74
    name=req.body.name;
    age=req.body.age;
    gender=req.body.gender;
    address=req.body.address;
    more=req.body.more;
    let outputToWrite=`the name of the client is ${name}, ${age} years old , ${gender}, residing at ${address}, more about him/her: ${more}`
    //not highly scalable but will work 
    fs.writeFileSync('output.txt',outputToWrite)
    const parms={'message':'Your form has been submitted successfully'}
    res.status(200).render('index.pug' , parms);


})


//START THE SERVER 
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});