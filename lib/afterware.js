class AfterWare {
    static async sendResponse(req, res, code = 500, data = {}) {
        return res.status(code).json(data);
    }
}

module.exports = AfterWare;