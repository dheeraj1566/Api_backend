import express from 'express';
import cors from 'cors';
import mongoose, { Schema } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);


(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dhawap1lt', 
        api_key: '157466517636747', 
        api_secret: '6i-CTn9dLM6qy5zr5Dejw7fxnhs' // Click 'View Credentials' below to copy your API secret
    });
    
    // // Upload an image
    //  const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/dhawap1lt/image/upload/v1721383781/rohit_sir_nzcb9f.jpg', {
    //            public_id: 'sir',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);
    
    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('sir', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('sir', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
})();

mongoose.connect(
  'mongodb+srv://dheerajjangid013:dheeraj@cluster0.tgir6dc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error', error);
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {

    type:String,
    required: true
  }

});

const Product = mongoose.model('Product', productSchema);


app.post('/post', async (req, res) => {
  try {
    const { name, description, price,image } = req.body;
    const product = new Product({ name, description, price, image });
    await product.save();
    console.log(product)
    res.json({ message: 'Product added successfully' });
  } catch (err) {
    console.log(err, 'error');
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.listen(port, () => console.log('Server running on port ${port}'));