const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const blogCategoryRouter = require('./routes/blogCatRoutes');
const brandRouter = require('./routes/brandRoutes');
const colorRouter = require('./routes/colorRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const bodyParser = require('body-parser');
const enquiryRoutes = require('./routes/enquiryRoutes');
const predictionRoutes = require('./routes/predictionRoute');
const productReqRoutes = require('./routes/productReqRoutes');
const sendEmailRouter = require('./routes/sendEmail');

const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/ErrorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);
app.use('/api/blogcategory', blogCategoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/color', colorRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", enquiryRoutes);
app.use("/api/prediction", predictionRoutes);
app.use("/api/product-requests", productReqRoutes);
app.use('/api/send-email', sendEmailRouter);

app.use(notFound);
app.use(errorHandler);

app.use('/', (req, res) => {
    res.send("Hello from server side");
});

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`);
});
