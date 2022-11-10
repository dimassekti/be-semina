// import model Talents
const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query; //nama keyword -> punya request dari query

  let condition = {}; //buat satu variabel condition dengan isi objek kosong

  if (keyword) {
    //jika keyword ada (true) maka
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
    // condition = { ...condition, name: keyword }; //apabila ingin search sama persis baru muncul
  }

  //populate -> mengambil data image -> hubungan relasi antara talent dan image dengan id
  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name", //apabila dihapus maka akan menampilkan created at and updated at
    })
    .select("_id name role image"); //apabila dihapus maka akan menampilkan created at and updated at

  return result;
};

const createTalents = async (req) => {
  //deklarasikan request dari body
  //utk image yang dikirim adalah id dari database
  const { name, role, image } = req.body;

  // cari image dengan field image
  // check image apakah id image tersebut ada atau tidak didatabase
  await checkingImage(image);

  // cari talents dengan field name
  // check talent duplikat/duplicate
  const check = await Talents.findOne({ name });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
  if (check) throw new BadRequestError("pembicara nama duplikat");

  const result = await Talents.create({ name, image, role });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  // cari image dengan field image
  await checkingImage(image);

  // cari talents dengan field name dan id selain dari yang dikirim dari params
  const check = await Talents.findOne({
    name,
    _id: { $ne: id },
  });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara nama duplikat
  if (check) throw new BadRequestError("pembicara nama duplikat");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada pembicara dengan id` yang dikirim client
  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
  });

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  await result.remove();

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents,
};
