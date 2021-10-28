const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { first } = require('cheerio/lib/api/traversing')

const app = express()
const Model3_list = [
    {
        "title": "2018 Tesla Model 3 Mid Range",
        "url": "https://www.edmunds.com/tesla/model-3/2018/vin/5YJ3E1EA3JF160852/?radius=50"
    },
    {
        "title": "2018 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2018/vin/5YJ3E1EAXJF123166/?radius=50"
    },
    {
        "title": "2018 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2018/vin/5YJ3E1EBXJF096673/?radius=50"
    },
    {
        "title": "2018 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2018/vin/5YJ3E1EB3JF184772/?radius=50"
    },
    {
        "title": "2019 Tesla Model 3 Standard Range Plus",
        "url": "https://www.edmunds.com/tesla/model-3/2019/vin/5YJ3E1EA3KF484143/?radius=50"
    },
    {
        "title": "2019 Tesla Model 3 Standard Range Plus",
        "url": "https://www.edmunds.com/tesla/model-3/2019/vin/5YJ3E1EA3KF402153/?radius=50"
    },
    {
        "title": "2020 Tesla Model 3 Standard Range Plus",
        "url": "https://www.edmunds.com/tesla/model-3/2020/vin/5YJ3E1EA7LF597336/?radius=50"
    },
    {
        "title": "2020 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2020/vin/5YJ3E1EB0LF617032/?radius=50"
    },
    {
        "title": "2021 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2021/vin/5YJ3E1EB7MF035625/?radius=50"
    },
    {
        "title": "2019 Tesla Model 3 Performance",
        "url": "https://www.edmunds.com/tesla/model-3/2019/vin/5YJ3E1EB5KF365454/?radius=50"
    },
    {
        "title": "2021 Tesla Model 3 Standard Range Plus",
        "url": "https://www.edmunds.com/tesla/model-3/2021/vin/5YJ3E1EA0MF907957/?radius=50"
    },
    {
        "title": "2018 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2018/vin/5YJ3E1EB1JF135571/?radius=50"
    },
    {
        "title": "2021 Tesla Model 3 Standard Range Plus",
        "url": "https://www.edmunds.com/tesla/model-3/2021/vin/5YJ3E1EA8MF072061/?radius=50"
    },
    {
        "title": "2021 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2021/vin/5YJ3E1EB0MF002224/?radius=50"
    },
    {
        "title": "2018 Tesla Model 3 Performance",
        "url": "https://www.edmunds.com/tesla/model-3/2018/vin/5YJ3E1EBXJF120664/?radius=50"
    },
    {
        "title": "2019 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2019/vin/5YJ3E1EB4KF388238/?radius=50"
    },
    {
        "title": "2018 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2018/vin/5YJ3E1EA5JF051888/?radius=50"
    },
    {
        "title": "2019 Tesla Model 3 Standard Range Plus",
        "url": "https://www.edmunds.com/tesla/model-3/2019/vin/5YJ3E1EA3KF444791/?radius=50"
    },
    {
        "title": "2019 Tesla Model 3 Standard Range Plus",
        "url": "https://www.edmunds.com/tesla/model-3/2019/vin/5YJ3E1EA9KF413111/?radius=50"
    },
    {
        "title": "2018 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2018/vin/5YJ3E1EB1JF104806/?radius=50"
    },
    {
        "title": "2019 Tesla Model 3 Long Range",
        "url": "https://www.edmunds.com/tesla/model-3/2019/vin/5YJ3E1EB3KF512807/?radius=50"
    }
]
const Individual_Model3 = []

app.get('/', (req, res) => {
    res.json("Welcome to the Edmund Scraper API")
})

//get Tesla Model 3 list
// app.get('/list', (req, res) => {
//     axios.get('https://www.edmunds.com/inventory/srp.html?make=tesla&model=model-3')
//         .then((response) => {
//             const html = response.data
//             const $ = cheerio.load(html)
//             $('a:contains("Tesla Model 3")', html).each(function () {
//                 const title = $(this).text()
//                 const url = "https://www.edmunds.com" + $(this).attr('href')
//                 Model3_list.push({
//                     title,
//                     url
//                 })
//             })
//             res.json(Model3_list)
//         }).catch((err) => console.log(err))
// })

Model3_list.forEach(Model3_list => {
    axios.get(Model3_list.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            const model = $("h1.not-opaque", html).text()
            const type = $("span.not-opaque", html).text()
            const vin = $("body > div.venom-app > div > main > div.pb-md-3_25 > div.vdp-content-wrapper.container > div > div.mt-md-1.pr-xl-2.col-12.col-md-7.offset-md-0.col-lg-8 > div.vdp-group.mb-2 > section > div.font-weight-normal.mb-1_25 > div > span.mr-1").text()
            const mileage = $('div.col:contains("miles")', html).text()
            const range = $('.col:contains("mi electric range")', html).text() // need to trim
            const report = $("body > div.venom-app > div > main > div.pb-md-3_25 > div.vdp-content-wrapper.container > div > div.mt-md-1.pr-xl-2.col-12.col-md-7.offset-md-0.col-lg-8 > div:nth-child(4) > div.row > div > section:nth-child(2) > div > ul > li:nth-child(1) > div > div").text()
            const title = $("body > div.venom-app > div > main > div.pb-md-3_25 > div.vdp-content-wrapper.container > div > div.mt-md-1.pr-xl-2.col-12.col-md-7.offset-md-0.col-lg-8 > div:nth-child(4) > div.row > div > section:nth-child(2) > div > ul > li:nth-child(4) > div").text()
            const ownerhistory = $("body > div.venom-app > div > main > div.pb-md-3_25 > div.vdp-content-wrapper.container > div > div.mt-md-1.pr-xl-2.col-12.col-md-7.offset-md-0.col-lg-8 > div:nth-child(4) > div.row > div > section:nth-child(2) > div > ul > li:nth-child(3) > div").text()
            const c_array = []
            $("body > div.venom-app > div > main > div.pb-md-3_25 > div.vdp-content-wrapper.container > div > div.mt-md-1.pr-xl-2.col-12.col-md-7.offset-md-0.col-lg-8 > div:nth-child(4) > div.row > div > section.features-and-specs.text-gray-darker > div.pl-1.pl-md-0.mb-0_5.row > div:nth-child(1) > div.features-with-collapse > ul > li:nth-child(1)", html).each(function () {
                const c = $(this).text()
                console.log(c)
                c_array.push(c)
            })
            Individual_Model3.push({
                vehicle_summary: {
                    model,
                    type,
                    mileage,
                    range,
                    vin,
                    ownerhistory,
                    c_array

                },
                vehicle_history: {
                    report,
                    title

                }, url: Model3_list.url
            })


        }).catch((err) => console.log(err))
})

app.get('/model3', (req, res) => {
    res.json(Individual_Model3)
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})