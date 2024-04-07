const express = require ('express');
const dbConnect = require('./config/dbConnect');
const app = express()
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const blogCategoryRouter = require('./routes/blogCatRoutes');
const brandRouter = require('./routes/brandRoutes');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/ErrorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')


dbConnect();

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/api/user', authRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/category', categoryRouter)
app.use('/api/blog-category', blogCategoryRouter)
app.use('/api/brand', brandRouter)


app.use(notFound)
app.use(errorHandler)


app.use('/', (req,res)=>{
    res.send("Hello from server side")
})

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
})

