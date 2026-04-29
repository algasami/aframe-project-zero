AFRAME.registerComponent("disable-frustum-culling", {
  init() {
    this.apply = this.apply.bind(this);
    this.el.addEventListener("model-loaded", this.apply);
    this.el.addEventListener("object3dset", this.apply);

    if (this.el.getObject3D("mesh")) {
      this.apply();
    }
  },
  remove() {
    this.el.removeEventListener("model-loaded", this.apply);
    this.el.removeEventListener("object3dset", this.apply);
  },

  apply() {
    const mesh = this.el.getObject3D("mesh");
    if (!mesh) {
      return;
    }
    mesh.traverse((node) => {
      if (node.isMesh) {
        node.frustumCulled = false;
      }
    });
  },
});
