const Item = require('../models/Items');

exports.getItems = (req, res) => {
    const item = Item.find()
        .then((item) => {
            res.status(200).json({ item: item })
        })
        .catch(err => console.log(err));
};

exports.AddItem = (req, res) => {
    const item = new Item(req.body);

    item.save()
        .then(result => {
            res.status(200).json({
                post: result
            });
        });
}
