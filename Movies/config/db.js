import mongoose from 'mongoose';
// import dns from 'dns';

// dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connect = async()=> {
    try {
        await mongoose.connect(process.env.Mongo_URI);

        console.log('Database connected ');
        
    } catch (error) { 
        console.error('Database connection failed !',error.message)
        process.exit(1);
    }
};  
