AFRAME.registerComponent("popcorn", {
  schema: {
    interval: { type: "number", default: 1 }, // seconds
    lastPop: { type: "number", default: 0 }, // timestamp of last pop
  },
  init: function () {
    console.log("Popcorn component initialized!");
    this.system.registerMe(this.el);
  },
});
