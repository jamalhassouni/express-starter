const middleware = (schema, objName) => {
    return (req, res, next) => {
        let error = null;
        let options = {
            allowUnknown: true
        }
        if (objName === "body") {
            error = schema.validate(req.body, options).error;
        } else if (objName === "params") {
            error = schema.validate(req.params, options).error;
        }
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join("");

            console.log("error", message);
            res.status(400).json({ data: { error: message }, error: true })
        }
    }
}
module.exports = middleware;