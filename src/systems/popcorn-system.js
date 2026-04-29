AFRAME.registerSystem("popcorn", {
  init: function () {
    this.popcorn_entities = [];
  },
  registerMe: function (el) {
    console.log("Registering popcorn entity: ", el);
    this.popcorn_entities.push(el);
  },
  unregisterMe: function (el) {
    const index = this.popcorn_entities.indexOf(el);
    if (index > -1) {
      this.popcorn_entities.splice(index, 1);
    }
  },
  tick: function (time, timeDelta) {
    for (let el of this.popcorn_entities) {
      const body = el.body;
      if (!body) continue; // only pop if it has physics
      const interval = el.getAttribute("popcorn").interval * 1000; // convert to ms
      if (!el.lastPop) {
        el.lastPop = time;
      }
      if (time - el.lastPop >= interval) {
        // !popping
        body.applyImpulse(
          new CANNON.Vec3(0, Math.random() * 5 + 5, 0),
          new CANNON.Vec3().copy(body.position),
        );
        console.log("Popcorn popped at: ", time);
        el.lastPop = time;
      }
    }
  },
});
