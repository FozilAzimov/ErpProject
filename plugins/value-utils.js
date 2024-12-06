export default ({ app }, inject) => {
  // Simplified function without passing vueInstance
  const handleNewValue = function (valueObject, objKey, value) {
    console.log(value, 'value');
    if (value === null) {
      this.$delete(valueObject, objKey);
    } else {
      this.$set(valueObject, objKey, value);
    }
  };

  // Inject the function so it can be used as this.$handleNewValue in components
  inject('handleNewValue', handleNewValue);
};