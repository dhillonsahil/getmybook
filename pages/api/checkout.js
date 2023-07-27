export default function handler(req,res){
    if(req.method!="POST"){
        res.status(400).json('should be a POST request')
        return;
    }
    const {name,email,city,postalCode,streetAddress , country,cart}= req.body;
    const productsId = products.split(',')
    // const 
}