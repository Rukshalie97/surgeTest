const Item = require('../models/item.model');

/**
 * Item Create Function.
 */
exports.item_create = function (req, res) {
    const user_id=req.user.user_id;
    let item = new Item(
        {
            note_item: req.body.note_item,
            user_id,
            note_description: req.body.note_description,
        }
    );
     item.save()
        .then(item => {
            res.status(200).json({'item': 'item added successfully'});
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('adding new item failed');
        });
};

/**
 * Get Item List Function.
 */
exports.items_list = function (req, res) {
    console.log(req.user)
    const user_id=req.user.user_id;
	Item.find({user_id},function(err, notes) {
        if (err) {
            console.log(err);
        } else {
            res.json(notes);
        }
    });
};

/**
 * Get Item Detail Function.
 */
exports.item_details = function (req, res) {
	let id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item);
    });
};

/**
 * Item update Function.
 */
exports.update_item = function (req, res) {
	 Item.findById(req.body.id, function(err, note) {
        if (!note)
            res.status(404).send("data is not found");
        else
        note.note_item = req.body.note_item;
        note.note_description = req.body.note_description;

        note.save().then(note => {
                res.json('note updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
};

/**
 * Item delete Function.
 */
exports.delete_item = function (req, res) {
    Item.findByIdAndRemove(req.body.id, function(err, item) {
    if (!item)
        res.status(404).send("data is not found");
    else
        res.json('Deleted successfully!');
});};
