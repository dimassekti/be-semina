const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.jpeg",
  });

  return result;
};

// tambahkan function checking Image
// check id image di database
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  //custom error
  // tidak ketemu
  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};
// jangan lupa export checkingImage
module.exports = { createImages, checkingImage };
