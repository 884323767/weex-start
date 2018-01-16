<template>
    <text :class="['btn', 'btn-' + type]"> {{value}}</text>
</template>
<script>
  const modal = weex.requireModule('modal')
  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
.btn{
  padding: 20px;
  font-size: 32px;
  text-align: center;
  border-style: solid;
}
.btn-nomal {
  background-color: #26A2FF;
  color: white;
}
.btn-nomal:active {
  background-color: #2071ab;
  color: white;
}
.btn-danger {
  background-color: #EF4F4F;
  color: white;
}
.btn-danger:active {
  background-color: #ab2048;
  color: white;
}
.btn-default {
  border-width: 3px;
  border-radius: 5px;
  border-color: lightslategray;
  background-color: #F6F8FA;
}
.btn-default:active {
  border-width: 3px;
  border-radius: 5px;
  border-color: lightslategray;
  background-color: #F6F6E5;
}

.btn-nomalborder {
  border-width: 3px;
  border-radius: 5px;
  border-color: #26A2FF;
}
.btn-nomalborder:active {
  border-width: 3px;
  border-radius: 5px;
  border-color: #2071ab;
}
.btn-dangerborder {
  border-width: 3px;
  border-radius: 5px;
  border-color: #EF4F4F;
}
.btn-dangerborder:active {
  border-width: 3px;
  border-radius: 5px;
  border-color: #ab2048;
}
.btn-defaultborder {
  border-width: 3px;
  border-radius: 5px;
  border-color: lightslategray;
}
.btn-defaultborder:active {
  background-color: #F6F6E5;
}
</style>
