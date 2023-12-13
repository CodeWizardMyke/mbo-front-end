
const privateViewsController ={
    dashboard:(req, res) => {
        return res.render('dashboard')
    },
    transactions:(req, res) => {
        return res.render('transactions_list')
    },
    transaction_item: (req, res) => {
        return res.render('transaction_item')
    },
    categorys_list: (req, res) => {
        return res.render('categorys_list.ejs')
    },
    category_item: (req, res) => {
        return res.render('category_item')
    }
}

module.exports = privateViewsController;