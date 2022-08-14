import dns from "dns";
import url from "url";

function ParseUrl(req, res, next) {
    const lookupUrl = String(req.body.url);

    const parsedLookupUrl = url.parse(lookupUrl);

    if (parsedLookupUrl === "") {
        console.log(1);
        res.json({ error: "invalid url" });
        return;
    }

    dns.lookup(
        parsedLookupUrl.protocol ? parsedLookupUrl.host : parsedLookupUrl.path,
        (error, address, family) => {
            if (error) {
                console.error("parsedLookupUrl", error);
                res.json({ error: "invalid url" });
                return;
            }

            // res.json({
            //     original_url: lookupUrl,
            //     short_url: parsedLookupUrl.href,
            // });

            req.parsedUrl = parsedLookupUrl.href;

            next();
            return;
        }
    );
}

export default ParseUrl;
