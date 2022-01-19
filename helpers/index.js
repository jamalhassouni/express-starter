/**
 *  Check if object empty
 * @param {Object} obj
 * @return {Boolean}
 */
function isObjEmpty(obj) {
  if (obj == undefined) {
    return true;
  }
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

/**
 * @description generate a unique id
 * @return unique id
 **/
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * @description Save image in specific folder
 * @param {string} image64
 * @param {string} directory
 * @return Image Path
 **/
async function saveImage(image64, dir, width = 100, height = 100) {
  const fs = require("fs");
  // const fsPromise = fs.promises;
  const path = require("path");
  const sharp = require("sharp");

  // let reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  // let match = image64.match(reg);
  // let baseType = {
  //   jpeg: 'jpg'
  // };

  // baseType['svg+xml'] = 'svg';

  // if (!match) {
  //   throw new Error("image_base64_error");
  // }

  // let extname = baseType[match[1]] ? baseType[match[1]] : match[1];
  // const data = {
  //   extname: '.' + extname,
  //   base64: match[2]
  // };

  let directory = "public/images/" + dir;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  // let name = Date.now() + data.extname;
  let name = Date.now() + ".png";
  let filepath = path.join(directory, name);
  const sharpData = await sharp(image64)
    .resize(width, height)
    .toFormat("png")
    .toFile(filepath);
  // await fsPromise.writeFile(filepath, data.base64, { encoding: 'base64' }, function (err) {
  //   if (err) {
  //     throw new Error("file_not_created");
  //   }
  // });
  return (directory + "/" + name).replace("public", "static");
}

/**
 * @description generate code with specific length
 * @param {integer} length
 * @return generated code
 **/
function smsCodeGenerator(length = 5) {
  if (length < 1) {
    length = 5;
  }
  let possible = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return code;
}

const phoneRegex = /(\+212|0)(6|7)([ \-_/]*)(\d[ \-_/]*){8}/;

module.exports = {
  isObjEmpty,
  uuidv4,
  saveImage,
  smsCodeGenerator,
  phoneRegex,
};
