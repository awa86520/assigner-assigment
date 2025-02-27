const Item = require("../models/itemModel");

exports.getItems = async (req, res) => {
  try {
    let { page = 1, limit = process.env.PAGE_LIMIT || 5, sort_by = "price", sort_order = "asc" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const sortOrder = sort_order === "asc" ? 1 : -1;

    const totalItems = await Item.countDocuments();
    const items = await Item.find()
      .sort({ [sort_by]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      data: items,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
