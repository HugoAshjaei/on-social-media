const express = require("express");
const app = express();
app.get('/', async (req, res) => {
    const id = 'HosseinDotLink';
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
})
app.get('/activity', async (req, res) => {
    res.send('posts page')
})
app.listen(3000, () => console.log("Server run at port 3000"));
