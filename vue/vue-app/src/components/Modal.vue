<template>
  <!-- click event for closing modal, after clicking backdrop-->
  <div class="backdrop" @click.self="closeModal">
    <div class="modal" :class="{ success: theme === 'success' }">
      <h1>{{ header }}</h1>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["header", "text", "theme"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
}
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modal h1 {
  color: red;
  display: inline-block;
}
.modal.success {
  background: lightgreen;
  color: darkslategray;
}
.modal.success h1 {
  color: darkslategray;
}
</style>
