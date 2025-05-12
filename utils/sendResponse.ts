import { Response } from "express"

interface metaInter{
    page?:number;
    limit?:number;
    total?:number;
    accessToken?:string
}

interface resPayloadInter{
    message?:string
    data?:any
    success?:boolean
    meta?:metaInter
    status?:number
}

export const sendResponse = (res: Response, data: any) => {
    const responsePayload:resPayloadInter = {
        meta: {
            page: data.page,
            limit: data.limit,
            total: data.total,
            accessToken: data.accessToken,
        },
        success: data.success,
        message: data.message,
        data: data.data,
        status:data.status
    };
  
    res.status(data.status).json(responsePayload);
};
  