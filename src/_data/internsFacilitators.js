const { groupBy } = require("./helpers");

const staff = [
  {
    name: "Olunga Theophilus",
    role: "facilitator",
    image: "images/staff/olunga.jpg",
  },
  {
    name: "Joseph Chol Machop",
    role: "facilitator",
    image: "images/staff/joseph.jpeg",
  },
  {
    name: "Anika Brennan",
    role: "intern",
    image: "images/staff/anika.jpeg",
  },
  {
    name: "Julia Greenman",
    role: "intern",
    image: "images/staff/julia.jpeg",
  },
  {
    name: "Charlie McManus",
    role: "intern",
    image: "images/staff/charlie.jpeg",
  },
  {
    name: "Mackenzie Williams",
    role: "intern",
    image: "images/staff/mackenzie.jpg",
  },
];

module.exports = groupBy(staff, "role");
