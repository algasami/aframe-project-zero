AFRAME.registerComponent("spherical-trigger", {
  schema: {
    radius: { type: "number", default: 1 },
    target: { type: "selector" },
    triggerName: { type: "string", default: "trigger" },
  },

  init: function () {
    this.isTriggered = false;
    this.updateRadiusSquared();
  },

  update: function () {
    this.updateRadiusSquared();
  },

  updateRadiusSquared: function () {
    this.radiusSq = this.data.radius * this.data.radius;
  },

  tick: function () {
    const target = this.data.target;
    if (!target) return;

    const distanceSq = this.el.object3D.position.distanceToSquared(
      target.object3D.position,
    );
    const isInside = distanceSq <= this.radiusSq;

    // Handle state transitions
    if (isInside && !this.isTriggered) {
      this.isTriggered = true;
      target.emit("spherical-trigger-enter", {
        triggerName: this.data.triggerName,
      });
    } else if (!isInside && this.isTriggered) {
      this.isTriggered = false;
      target.emit("spherical-trigger-leave", {
        triggerName: this.data.triggerName,
      });
    }
  },
});
