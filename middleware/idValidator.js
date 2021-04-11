const ids = require('../config/ids.json');

exports.hasID = async (req, res, next) => {
    try {
        const whereID = ids[req.originalUrl.split('/')[2]];
        if (!whereID)
            return res.status(404).json({msg: `Your ${req.originalUrl.split('/')[2]} id not found on config file`});
        req.id = whereID;
        next();
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
};
