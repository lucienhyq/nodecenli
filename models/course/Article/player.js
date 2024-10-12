var mongoose = require("mongoose");
const db = require("../../../db");
const Schema = mongoose.Schema;
const playerschema = new Schema({
  playerId: {
    type: Number,
    unique: true,
  },
  season: Number,
  lastNameEn: {
    type: String,
    default: "",
  },
  firstNameEn: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  teamId: Number,
  teamAbbr: {
    type: String,
    default: "",
  },
  teamName: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "",
  },
  teamCity: {
    type: String,
    default: "",
  },
  teamLogoDark: {
    type: String,
    default: "",
  },
  teamLogoLight: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "",
  },
  weight: {
    type: String,
    default: "",
  },
  heightMetric: {
    type: String,
    default: "",
  },
  weightMetric: {
    type: String,
    default: "",
  },
  birthDate: {
    type: String,
    default: "",
  },
  jerseyNo: {
    type: String,
    default: "",
  },
  playerCode: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  school: {
    type: String,
    default: "",
  },
  draftSeason: Number,
  rookieSeason: Number,
  experience: {
    type: String,
    default: "",
  },
  displayName: {
    type: String,
    default: "",
  },
  retireYear: Number,
  startYear: Number,
  avatar: {
    type: String,
    default: "",
  },
  halfPhotoBig: {
    type: String,
    default: "",
  },
});
playerschema.index({ id: 1 });
const players = db.model("Players", playerschema);

module.exports = players;
