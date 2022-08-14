import Url from "../models/UrlSchema.js";

async function CreateShortUrl(req, res, next) {
    try {
        const url = new Url({ longUrl: req.parsedUrl });
        await url.save((err) => {
            console.log("save err", err);
        });
        console.log(url);
        res.json({ original_url: req.parsedUrl, short_url: url.shortUrl });

        next();
    } catch (error) {
        throw error;
    }
    return;
}

export default CreateShortUrl;
