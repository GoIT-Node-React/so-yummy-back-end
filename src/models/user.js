const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { isEmailValid } = require('../helpers/validation');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      validate: [isEmailValid, 'Please fill a valid email address'],
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, 'Set password for user'],
    },
    avatarURL: {
      type: String,
      default: null,
    },
    subscription: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: null,
    },
    accessToken: { type: String, default: null },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

schema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  }
});

schema.methods.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model('user', schema);

module.exports = UserModel;
