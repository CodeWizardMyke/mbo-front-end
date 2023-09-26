
const privateViewsController ={
    profile:(req, res) => {
        return res.render('profile')
    },
    transactions:(req, res) => {
        return res.render('transactions')
    },
    transaction_item: (req, res) => {
        return res.render('transaction_item')
    }
}

module.exports = privateViewsController;