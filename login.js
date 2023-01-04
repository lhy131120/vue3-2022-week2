import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io';
const api_path = 'sakimotorin-vue2022';

const app = {
  // data
  data() {
    return {
      // 'text': '這是一直的說',
      users:  {
        username: '',
        password: ''
      }
    }
  },
  // 方法
  methods: {
    login() {
      // 登入API
      axios.post(`${url}/v2/admin/signin`, this.users)
        .then(res=>{
          console.log(res.data);
          // 需要帶token出來用作組合cookie
          const { token, expired } = res.data;
          // console.log(token, expired)
          document.cookie = `customCookieName=${token}; expires=${new Date(expired)};`; // unix timestramp 用new Date
          this.clearInputVal();
          window.location = './products.html'
        })
        .catch(err=>{
          console.log(err.data);
          alert(err.data.error.code)
          this.clearInputVal();
        })
    }
    ,clearInputVal() {
      this.users.username = '';
      this.users.password = '';
    }
  },
  // 生命週期
  mounted(){
    console.log('Start Vue Function');
  }
}

createApp(app)
  .mount('#app');