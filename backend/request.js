const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const csvFilePath = path.join(__dirname, 'Trial 30 for wesbite.csv');
const csvData = fs.readFileSync(csvFilePath, 'utf8');
const data = csvData.split('\n').map(line => line.split(',').slice(1).map(item => item.trim()));
const url = ""

const postRequest = async (twitterName, IRLname, country, walletAddress, showAddress, twitterLink, discordLink, telegramLink, youtubeLink, streamLink) => {
    const imageRootPath = 'C:\\Users\\CaptainFaisal\\Documents\\drive-download-20250324T212534Z-001\\';
    let imagePath = path.join(imageRootPath, twitterName + ".jpg");
    if (!fs.existsSync(imagePath)) {
        imagePath = path.join(imageRootPath, twitterName + ".png");
    }
    if (!fs.existsSync(imagePath)) {
        imagePath = path.join(imageRootPath, twitterName + ".jpeg");
    }
    if (!fs.existsSync(imagePath)) {
        console.error("Image file not found");
        return;
    }
    const form = new FormData();
    form.append('twitterName', twitterName);
    form.append('IRLname', IRLname);
    form.append('country', country);
    form.append('walletAddress', walletAddress);
    form.append('showAddress', showAddress === "Yes" | showAddress === "yes" ? 'true' : 'false');
    form.append('signID', 'test');
    form.append('twitterLink', twitterLink);
    if (discordLink != "N/A") {
        form.append('discordLink', discordLink);
    }
    if (telegramLink != "N/A") {
        form.append('telegramLink', telegramLink);
    }
    if (youtubeLink != "N/A") {
        form.append('youtubeLink', youtubeLink);
    }
    if (streamLink != "N/A") {
        form.append('streamLink', streamLink);
    }
    form.append('imageFile', fs.createReadStream(imagePath));

    try {
        const response = await axios.post(`${url}/KOLregister/submitVerificationRequest`, form, {
            headers: {
                ...form.getHeaders()
            }
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

data.forEach(async (row) => {
    await postRequest(...row);
})