const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const { check,validationResult } = require('express-validator')
var models = require('./models');
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  models.sequelize.drop()
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended:false }))
  
  const paginate = (query, { page, pageSize }) => {
    const offset = page * pageSize;
    const limit = pageSize;
  
    return {
      ...query,
      offset,
      limit,
    };
  };

  app.post('/v1/api/blog',(req,res) => {
    var page = req.body.params.page
    var PageLimit = req.body.params.limit
    models.Posts.findAll({
      attributes: ['title', 'ShortBody'],
      limit:PageLimit,
      offset:(page-1)*PageLimit
    }).then(posts => res.json(posts));
    return res.status(203)
  })
  // Give nuxt middleware to express
  app.use(nuxt.render)
  
  models.sequelize.sync().then(function() {
    for(var i=0;i<50;i++){
      var b = "توسط فرم زیر می توانید متن ساختگی مورد نظر خود را در واحدهای کاراکتر، کلمه و پاراگراف تولید کنید، سپس آنرا کپی کنید و در کار مورد نظر خود قرار دهید."
      var c = "رصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
      var a = models.Posts.build({title: i,ShortBody:b,body:c});
      a.save();
    }
    // Listen the server
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  });
}
start()
