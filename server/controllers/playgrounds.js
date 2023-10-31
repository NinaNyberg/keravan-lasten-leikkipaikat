const Playground = require('../models/Playground');

exports.getPlaygrounds = async (req, res, next) => {
  try {
    const playgrounds = await Playground.find();

    return res.status(200).json({
      success: true,
      count: playgrounds.length,
      data: playgrounds
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addPlayground = async (req, res, next) => {
  try {
    console.log(req.body);
    const playground = await Playground.create(req.body);

    return res.status(200).json({
      success: true,
      data: playground
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
