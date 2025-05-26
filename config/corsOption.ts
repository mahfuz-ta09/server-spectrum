const urlList = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://spectrum-ruby.vercel.app'
] 

export const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (!origin || urlList.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders:["Content-Type", "Authorization","authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true
}

