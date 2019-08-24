// vue.config.js
module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `@import '~bootstrap/scss/functions';
                @import '~bootstrap/scss/variables';
                @import '~bootstrap/scss/mixins';`
        }
      }
    }
  };