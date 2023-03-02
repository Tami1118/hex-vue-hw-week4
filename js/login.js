// 外部資料匯入
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { singinUrl } from "../js/config.js";


const app = createApp ({
  data(){
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    singin(){
      axios.post(singinUrl, this.user)
        .then(res => {
          alert(res.data.message);

          // 取得cookie
          const { token, expired } = res.data;
          document.cookie = `hexToken=${ token }; expires=${expired}`;

          // 轉跳頁面
          window.location = '/productsAdmin.html';
        })
        .catch(err => {
          alert(err.data.message);
        })
    }
  }
})

app.mount('#app');