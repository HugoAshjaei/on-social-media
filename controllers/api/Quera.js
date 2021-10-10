const cheerio = require('cheerio');
const axios = require('axios');
const {writeFile} =require('fs').promises

module.exports.GetQuera = async () => {

    const Soup = []
   for (let index = 10; index < 200; index++) {
        try {
            const URL = `https://quera.ir/careers/job/${index}`
            const { data } = await axios.get(URL)
            const $ = cheerio.load(data);
            const Title = $('#job-info > div.content.center-in-mobile > h1').text().replace(/(\r\n|\n|\r)/gm, "");
            const date = $("#job-info > div.content.center-in-mobile > div.ui.horizontal.link.list.right.floated.hide-in-mobile").text().replace(/(\r\n|\n|\r)/gm, "");
            const MiniDes = $('#job-page-container > div.eleven.wide.computer.ten.wide.tablet.column > div:nth-child(6) > div > div.five.wide.computer.seven.wide.tablet.column').text().trim().replace(/(\r\n|\n|\r)/gm, "");
            const JobTitleAndCapa = $('#job-page-container > div.eleven.wide.computer.ten.wide.tablet.column > div:nth-child(6) > div > div.eleven.wide.computer.nine.wide.tablet.column').text().trim().replace(/(\r\n|\n|\r)/gm, "");
            const FullDes = $('#job-page-container > div.eleven.wide.computer.ten.wide.tablet.column > div:nth-child(7)').text().trim().replace(/(\r\n|\n|\r)/gm, "");
            const CompanyDec = $('#job-page-container > div.eleven.wide.computer.ten.wide.tablet.column > div:nth-child(10)').text().trim().replace(/(\r\n|\n|\r)/gm, "");
            let noodle = {
                URl: URL,
                Title: Title,
                Date: date,
                Minides: MiniDes,
                JobTitleAndCapa: JobTitleAndCapa,
                FullDes: FullDes,
                CompanyDec: CompanyDec
            }
            Soup.push(noodle)
        } catch (error) {
            console.log(error);
            console.log('err');
        }
    }
    await writeFile('./json.json',JSON.stringify(Soup))
    return Soup

}