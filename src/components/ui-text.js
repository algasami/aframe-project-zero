AFRAME.registerComponent("ui-text", {
  schema: {
    trigger_receiver: { type: "selector" },
  },
  init: function () {
    // keep track of this
    this.onTriggerEnter = this.onTriggerEnter.bind(this);
    this.onTriggerLeave = this.onTriggerLeave.bind(this);
    if (this.data.trigger_receiver) {
      this.addTriggerListeners(this.data.trigger_receiver);
    }
  },
  update: function (oldData) {
    if (this.data.trigger_receiver === oldData.trigger_receiver) return;
    if (oldData.trigger_receiver)
      this.removeTriggerListeners(oldData.trigger_receiver);
    if (this.data.trigger_receiver)
      this.addTriggerListeners(this.data.trigger_receiver);
  },
  addTriggerListeners: function (receiver) {
    receiver.addEventListener("spherical-trigger-enter", this.onTriggerEnter);
    receiver.addEventListener("spherical-trigger-leave", this.onTriggerLeave);
  },
  removeTriggerListeners: function (receiver) {
    receiver.removeEventListener(
      "spherical-trigger-enter",
      this.onTriggerEnter,
    );
    receiver.removeEventListener(
      "spherical-trigger-leave",
      this.onTriggerLeave,
    );
  },
  onTriggerEnter: function (evt) {
    const { triggerName } = evt.detail;
    if (triggerName === "horse_trigger") {
      this.el.setAttribute("text", "value", "Skinny horse says hi!");
    } else if (triggerName === "crow_trigger") {
      this.el.setAttribute("text", "value", "Caw caw!");
    }
    console.log("Trigger Entered: ", triggerName);
  },
  onTriggerLeave: function (evt) {
    const { triggerName } = evt.detail;
    this.el.setAttribute("text", "value", "");
    console.log("Trigger Left: ", triggerName);
  },
});
