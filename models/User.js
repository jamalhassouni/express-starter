const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseLeanGetters = require("mongoose-lean-getters");
const mongooseLeanDefaults = require("mongoose-lean-defaults");

// Create Schema
const adrSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        required: false,
        default: "Point",
      },
      coordinates: {
        type: Array,
        required: true,
        get: (v) => {
          const value = [...v];
          return value.reverse();
        },
      },
    },
    is_selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
  }
);

const UserSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    addresses: {
      type: [adrSchema],
      required: false,
    },
    avatar: {
      type: String,
      get: (v) => {
        if (v) {
          return `${root}/${v}`;
        } else {
          return `${root}/static/images/users/default.png`;
        }
      },
      required: false,
    },
    is_phone_verified: {
      type: Boolean,
      default: false,
    },
    phone_number: {
      type: String,
      required: false,
    },
    phone_code: {
      type: String,
      required: false,
    },
    code_expiration_date: {
      type: String,
      required: false,
    },
    facebookId: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
  }
);

UserSchema.pre("save", async function (next) {
  //Check if password is not modified
  if (!this.isModified("password")) {
    return next();
  }

  //Encrypt the password
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (e) {
    return next(e);
  }
});

// is Password match method

UserSchema.methods.isPasswordMatch = function (password, hashed, callback) {
  bcrypt.compare(password, hashed, (err, success) => {
    if (err) {
      return callback(err);
    }
    callback(null, success);
  });
};

// delete password filed from output
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

adrSchema.index({ location: "2dsphere" });
UserSchema.plugin(mongoosePaginate);
// Add this plugin to apply getters when using `lean()`.
UserSchema.plugin(mongooseLeanGetters);
UserSchema.plugin(mongooseLeanDefaults);

module.exports = User = mongoose.model("users", UserSchema);
module.exports.UserSchema = UserSchema;
module.exports.adrSchema = adrSchema;
