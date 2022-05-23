import axios from "axios";

export default async (req:any, res:any) => {
    res.statusCode = 200    
    // try {
        const {token1,token2} = req.query;
        const request = await axios.get(`https://ftx.com/api/markets/${token1}/${token2}`)
        console.log(request.data.result.price);
        res.json(request.data)
    // } catch (err) {
    //     console.log(err);
    // }
    
}