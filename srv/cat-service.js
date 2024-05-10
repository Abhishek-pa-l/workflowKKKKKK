const axios = require("axios");

 
module.exports = async srv => {
 
    
 
    srv.on('Submit', async function (req) {
        try {
            let dataa =   JSON.parse(req.data.payload);
            const data = {
                "definitionId": "us10.af9f7ea0trial.firstprocess.form",
                "context": {
                    "supplier": dataa.supplier,
                    "orderNo": dataa.orderNo,
                    "amount": dataa.amount
                }
            }
 
            // Your OAuth details
            const oauthUrl = "https://af9f7ea0trial.authentication.us10.hana.ondemand.com";
            const clientId = "sb-5cdb2e9c-7d23-47e8-be4d-c064359af0e8!b278261|xsuaa!b49390";
            const clientSecret = "21c05849-cfe3-46f2-aa4e-ba1d0ea21500$poT7FNkamLvkC903P4c1MaURm5R8wTOtgIPQONHhOMw=";
 
            // Fetch JWT Token
            const token = await _fetchJwtToken(oauthUrl, clientId, clientSecret);
 
            // SAP Build Automation Process workflow endpoint
            const iflow_url = "https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances";
 
            const headers = {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                Accept: "application/json",
            };
 
            // Include the definitionId in the payload
            data.definitionId = "us10.af9f7ea0trial.firstprocess.form";
 
            // Call SAP Build Automation Process workflow
            const resultSpa = await axios.post(iflow_url, data, { headers });
 
            console.log('got resultSpa');
            console.log(resultSpa.data);
 
            // Assuming the API response contains some meaningful data
            return resultSpa.data;
        } catch (error) {
            console.log('got error');
            console.error(error);
 
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
            }
 
            // Handle the error or return an appropriate response
            return req.error({ code: 500, message: 'Internal Server Error' });
        }
    });
 
    const _fetchJwtToken = async function (oauthUrl, oauthClient, oauthSecret) {
        try {
            const tokenUrl = oauthUrl + "/oauth/token?grant_type=client_credentials&response_type=token";
            const config = {
                headers: {
                    Authorization: "Basic " + Buffer.from(oauthClient + ":" + oauthSecret).toString("base64"),
                },
            };
            const response = await axios.get(tokenUrl, config);
            return response.data.access_token;
        } catch (error) {
            throw error;
        }
        
    };
    // srv.on('Trigger', async function (req, res) {
       
    //     try {
    //         let item = JSON.parse(req.data.payload);
    //         var options = {
    //             url: 'https://clm-sl-ans-live-ans-service-api.cfapps.us10.hana.ondemand.com/cf/producer/v1/resource-events',
    //             method: 'POST',
    //             auth: {
    //                 user: "843ef0e3-7164-4b70-b051-c0f17c7ae0e1",
    //                 password: "dn2MY6rX8kgvDCSpl7zxo7ADBz4MEWNm"
    //             },
    //             json: {
    //                 "eventType": "mycustomevent",
    //                 "resource": {
    //                     "resourceName": "Your Node.js App.",
    //                     "resourceType": "app",
    //                     "tags": {
    //                         "env": "develop environment"
    //                     }
    //                 },
    //                 "severity": "FATAL",
    //                 "category": "ALERT",
    //                 "subject": "Something is wrong.",
    //                 "body": `${item.ProductName} is low in quantity please Order`,
    //                 "tags": {
    //                     "ans:correlationId": "30118",
    //                     "ans:status": "CREATE_OR_UPDATE",
    //                     "customTag": "42"
    //                 }
    //             }
    //         };
   
    //         // Use async/await with the request-promise library for asynchronous request
    //         const response = await request(options);
    //         console.log(response.body);
    //         // res.status(200).send(response.body);
    //     } catch (error) {
    //         console.log('got error');
    //         console.error(error);
   
    //         // Handle the error or return an appropriate response
    //         res.status(500).json({ code: 500, message: 'Internal Server Error' });
    //     }
    // });
   
 
    // async function _fetchJwtToken(oauthUrl, oauthClient, oauthSecret) {
    //     try {
    //         const tokenUrl = oauthUrl + "/oauth/token?grant_type=client_credentials&response_type=token";
    //         const config = {
    //             headers: {
    //                 Authorization: "Basic " + Buffer.from(oauthClient + ":" + oauthSecret).toString("base64"),
    //             },
    //         };
    //         const response = await axios.get(tokenUrl, config);
    //         return response.data.access_token;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
};

 