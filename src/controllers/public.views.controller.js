
const publicViewsController = {
    index:(req, res) => {
        return res.render('index.ejs')
    },
    singin:(req, res) => {
        return res.render('singin')
    }
}

module.exports = publicViewsController;