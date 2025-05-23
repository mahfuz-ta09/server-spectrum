const urlList = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://spectrum-ruby.vercel.app'
] 

export const corsOptions = {
    origin: function (origin:any, callback:any) {
      if (urlList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    // origin:"*",
    allowedHeaders:["Content-Type", "Authorization","authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true
}

