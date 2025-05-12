const urlList = ['http://localhost:3000'] 

export const corsOptions = {
    origin: function (origin:any, callback:any) {
      if (urlList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders:["Content-Type", "Authorization","authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true
}