import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

// const url = 'https://vue3-course-api.hexschool.io';
// const api_path = 'sakimotorin-vue2022';

const app = {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      api_path: 'sakimotorin-vue2022',
      products: [],
      template: {},
    };
  },
  methods: {
    userCheck() {
      axios.post(`${this.url}/v2/api/user/check`)
        .then(res => {
          // console.log(res.data);
          // 成功驗證後,可以getProducts
          this.getProducts();
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    getProducts() {
      axios.get(`${this.url}/v2/api/${this.api_path}/admin/products/all`)
        .then(res => {
          console.log(res.data)
          this.products = res.data.products;
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    // products page 需要檢驗才可以getProduts
    // 由於需要axios需要把token放進header, 因此需要定義cookie備用
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)customCookieName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token; //defaults每次都帶入
    this.userCheck();
  }
}

createApp(app)
  .mount('#app');
