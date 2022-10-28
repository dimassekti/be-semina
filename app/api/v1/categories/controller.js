// import model category
const Categories = require("./model");

const {} = require("../../../services/mongoose/categories");
const {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoosex/categories");

// buat function create
const create = async (req, res, next) => {
  try {
    // membuat categories baru menggunakan data dari `name`
    const { name } = req.body;

    // simpan Category yang baru dibuat ke MongoDB
    const result = await Categories.create({ name });

    // berikan response kepada client dengan mengembalikan product yang baru dibuat
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    // jika terjadi kesalahan kemudian gunakan method `next` agar Express memproses error tersebut
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await Categories.find();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;

    // mencari categories di MongoDB berdasarkan field _id
    const result = await Categories.findOne({ _id: id });

    // bila result tidak mendapatkan data categories maka akan mereturn response `message: 'Id categories tidak ditemukan'`
    if (!result) {
      return res.status(404).json({ message: "Id categories tidak ditemukan" });
    }

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // cari dan update categories berdasarkan field _id
    const result = await Categories.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true } // menampilkan data baru dan menjalankan validation
    );

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    // cari dan hapus categories berdasakan field _id
    const result = await Categories.findByIdAndRemove(id);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Export fungsi create pada controller categories
module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
