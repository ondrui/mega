export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  methods: {
    onWindowResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
  },
  mounted() {
    this.onWindowResize();
    window.addEventListener("resize", this.onWindowResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.onWindowResize);
  },
};
