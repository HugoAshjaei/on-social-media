const axios = require('axios');
const convert = require('xml-js');
const cheerio = require('cheerio');

// get profile
exports.getProfile = async (req, res) => {
    const id = req.id;
    try {
        const url = 'https://t.me/' + id;
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);
        const imageURL = $('img[class=tgme_page_photo_image]').attr('src');
        const name = $('div[class=tgme_page_title] span').text().trim(' ');
        const bio = $('.tgme_page_description').text();

        res.json({
            id: id,
            url: url,
            social: "telegram",
            image: imageURL,
            name: name,
            bio: bio,
            followers: null,
            followings: null
        });

    } catch (err) {
        // console.log(err);
        return res.status(404).json({msg: "User not found"});
    }
};