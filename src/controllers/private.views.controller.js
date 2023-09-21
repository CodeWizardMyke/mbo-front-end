
const privateViewsController ={
    profile:(req, res) => {
        return res.render('profile')
    },
    transactions:(req, res) => {
        return res.render('transactions')
    },
}

module.exports = privateViewsController;