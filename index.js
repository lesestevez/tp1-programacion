import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
try{
     const data = fs.readFileSync("./db.json");
     return JSON.parse(data)
    }catch(error) {
        console.log(error);
    }
};  

const writeData = (data) => {
    try { 
        fs.writeFileSync("./db.json", JSON.stringify(data));
       
        }catch (error) {
            console.log(error);
        }
};

app.get("/", (req, res) => {
    
    res.send( "bienvenido a mi primera api con node")
});

app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books)
});

app.get("/books/:id",(req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const books = data.books.find ((books) => books.id === id);
    res.json(books);
});

app.post("/books", (req, res) =>{
    const data = readData();
    const body = req.body;
    const newbook = { 
     id: data.books.length + 1,
     ...body   
    };
    data.books.push(newbook);
    writeData(data);
    res.json(newbook);
});

app.put ("/books/:id",(req, res ) =>{
    const data = readData();
    const body =req.body;
    const id = parseInt(req.params.id);
    const bookindex =data.books.findIndex((book) =>book.id === id);
    data.books[bookindex]={
    ...data.books[bookindex],
    ...body,    
    };

    writeData(data);
    res.json({message:"nuevo libro"});


});


app.delete("/books/:id", (req , res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookindex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookindex, 1);
    writeData(data);
    res.json({message: "libro borrado"});

});



app.listen(3000,() =>{
    console.log('server listening on port 3000');
});
