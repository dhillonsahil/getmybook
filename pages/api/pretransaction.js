
const https = require('https');
const PaytmChecksum = require('paytmchecksum');

export default async function handler(req, res) {

    if (req.method == "POST") {



        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "Get My Book",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MKEY).then(async function(checksum){

            paytmParams.head = {
                "signature"    : checksum
            };
        
            var post_data = JSON.stringify(paytmParams);
        
            const requestAsync = async () => {
                return new Promise((resolve, reject) => {
                    var options = {

                        hostname: 'securegw.paytm.in',
    
                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };
    
                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });
    
                        post_res.on('end', function () {
                            console.log('Response: ', response);
                            resolve(response)
                        });
                    });
            
                    post_req.write(post_data);
                    post_req.end();
                });
            };
            
            
            try {
                let myr = await requestAsync();
                res.status(200).json(myr);
            } catch (error) {
                console.error('Error during payment initiation:', error);
                res.status(500).json({ error: 'Payment initiation failed. Please try again later.' });
            }
            
        });

       
    }
}