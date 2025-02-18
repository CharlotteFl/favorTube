import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {required, email, max, min, size, oneOf} from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
import Vuebar from 'vuebar'
import { getSize } from './utils/util'

import '@mdi/font/css/materialdesignicons.min.css';

import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard)

import VueLoadmore from 'vuejs-loadmore';

Vue.use(VueLoadmore, {
  lang: 'en-US'
});

import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing);

setInteractionMode('eager')

extend('api', {
  message: "Api invalid",
  validate: value => {
    let pattern = new RegExp('^(http(s?)?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(value);
  }
});


extend('required', {
  ...required,
  message: 'Enter {_field_}'
})

extend('oneOf', {
  ...oneOf
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

extend('password', {
  params: ['target'],
  validate(value, {target}) {
    return value === target
  },
  message: 'Password does not match'
})

extend('size', {
  ...size,
  message: (name, rules) => {
    return `video size should be less than ${getSize(rules.size)}!`
  }
})

Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// Vue.use(InfiniteLoading, {
//   props: {
//     distance: null
//     /* other props need to configure */
//   }
// })

// Vue.component('InfiniteLoading', InfiniteLoading)

Vue.use(Vuebar)


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')


