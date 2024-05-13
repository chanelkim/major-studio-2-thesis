<template>
  <!-- click event for closing modal, after clicking backdrop-->
  <div class="backdrop" @click.self="closeModal">
    <div class="modal" :class="{ success: theme === 'success' }">
      <slot>default content</slot>
      <div class="actions">
        <slot name="links"></slot>
      </div>
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
.modal p {
  font-style: normal;
}
.modal .actions {
  text-align: center;
  margin: 30px 0 10px 0;
}
.modal .actions a {
  color: #333;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  text-decoration: none;
  margin: 10px;
}
.modal.success {
  background: lightgreen;
  color: darkslategray;
}
.modal.success h1 {
  color: darkslategray;
}
.modal.success .actions {
  color: darkolivegreen;
}
.modal.success .actions a {
  color: darkolivegreen;
  border: 1px solid darkolivegreen;
}
</style>
