export default {
  methods: {
    jump (to) {
      debugger;
      if (this.$router) {
        this.$router.push(to)
      }
    }
  }
}
