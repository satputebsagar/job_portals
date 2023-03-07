const express =require('express');
const app=express();
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
require("dotenv").config();

const cors=require('cors');
const cookieParser = require('cookie-parser');

const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const errorHandler=require('./middleware/error');



// database connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
}).then(()=>console.log("connected MGD"))
.catch((err)=>console.log(err));


// middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'30mb'}));
app.use(bodyParser.urlencoded({
    limit:'20mb',
    extended:true
}));
app.use(cookieParser());
app.use(cors());
// routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
// error 
app.use(errorHandler);

// port
const port =process.env.PORT || 8088;

app.listen(port ,()=>{
    console.log(`server running on port ${port}`)
});
