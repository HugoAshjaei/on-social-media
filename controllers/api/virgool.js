const axios = require('axios');
const convert = require('xml-js');
const cheerio = require('cheerio');

// get profile
exports.getProfile = async (req, res) => {
    const id = req.id;
    try {
        const url = 'https://virgool.io/@' + id;
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);
        const imageURL = $('div[class=module--avatar] a').find('img').attr('src');
        const name = $('a[class=module--name]').text().trim(' ');
        const bio = $('.module--bio').text();
        const follower = $('.followers span').html().replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
        const following = $('.following  span').html().replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

        res.json({
            id: id,
            url: url,
            social: "virgool",
            image: imageURL,
            name: name,
            bio: bio,
            followers: Number(follower),
            followings: Number(following)
        });

    } catch (err) {
        // console.log(err);
        return res.status(404).json({msg: "User not found"});
    }
};

// get profile activity
exports.getProfileActivity = async (req, res) => {
    const id = req.id;
    let posts = [];
    try {
        const url = 'https://virgool.io/feed/@' + id;
        const xml = await axios.get(url);
        const json = convert.xml2js(xml.data, {compact: true, spaces: 4}).feed.entry;
        for (let i in json) {
            const $ = cheerio.load(json[i].content._cdata);
            posts.push({
                title: json[i].title._cdata,
                summary: json[i].summary._cdata,
                url: json[i].link._attributes.href,
                image: $('body').find('img').attr('src'),
                date: new Date(json[i].updated._text)
            })

        }
        if (posts.length < 1)
            return res.status(404).json({msg: "There is no post yet!"})
        res.send(posts);

    } catch (err) {
        console.error("server error get banner image..." + err);
        return res.status(404).json({msg: "User not found"});
    }
};
