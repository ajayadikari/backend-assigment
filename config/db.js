import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('db connection successfull')
    } catch (error) {
        console.log('error in connecting to db')
        console.log(error)
    }
}

export default connectDb