AFRAME.registerComponent("spherical-trigger", {
  schema: {
    radius: { type: "number", default: 1 },
    target: { type: "selector" },
    trigger_name: { type: "string", default: "trigger" },
    _triggered: { type: "boolean", default: false },
  },
  init: function () {
    this.sqrRadius = this.data.radius * this.data.radius;
  },
  update: function () {
    this.sqrRadius = this.data.radius * this.data.radius;
  },
  tick: function (time, delta) {
    const target = this.data.target;
    if (!target) {
      return;
    }
    const dist = this.el.object3D.position.distanceToSquared(
      target.object3D.position,
    );
    if (dist > this.sqrRadius) {
      if (this.data._triggered) {
        this.data._triggered = false;
        this.data.target.emit(
          "on_trigger_leave",
          { trigger_name: this.data.trigger_name },
          false,
        );
      }
      return;
    }
    if (this.data._triggered) return;
    this.data._triggered = true;
    this.data.target.emit(
      "on_trigger_enter",
      { trigger_name: this.data.trigger_name },
      false,
    );
  },
});
