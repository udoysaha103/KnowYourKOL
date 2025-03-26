const ids = require('./ids.json');
const axios = require('axios');
const url = "http://localhost:5000";

const postData = async (id) => {
    try {

        const response = await axios.post(`${url}/KOLregister/verifyKOL`, { KOL_id: id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status !== 200) {
            throw new Error(`Failed to post data for ID ${id}: ${response.statusText}`);
        }
        return response.data; // Return the response data for further processing if needed
    }
    catch (error) {
        console.error(`Error posting data for ID ${id}:`, error.message);
        throw error; // Rethrow the error to be caught in the calling function
    }
}

const verifyAllIds = async () => {
    for (const id of ids) {
        try {
            const response = await postData(id._id.$oid);
            console.log(`Response for ID ${id._id.$oid}:`, response);
        }
        catch (error) {
            console.error(`Error verifying ID ${id._id.$oid}:`, error.message);
        }
    }
}

verifyAllIds();