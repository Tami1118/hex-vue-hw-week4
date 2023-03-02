// 外部資料匯入
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { checkAdminUrl, getProductsUrl, addProductUrl, editProductUrl, delProductUrl } from "../js/config.js";
import paginationView from "../components/paginationView.js";
import updateModalView from "../components/updateModalView.js";
import delModalView from "../components/delModalView.js";


// 模板初始化
let productModal = '';
let delProductModal = '';


const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      page: {},
    }
  },
  mounted() {
    // 身份驗證
    this.setCookie();
    this.checkAdmin();

    productModal = new bootstrap.Modal('#productModal');
    delProductModal = new bootstrap.Modal('#delProductModal');
  },
  methods: {
    setCookie() {
      // axios取得cookie權限
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;
    },

    checkAdmin() {
      axios.post(checkAdminUrl)
        .then(() => {
          this.getProducts();
        })
        .catch(err => {
          alert(err.data.message);
          window.location = "../login.html";
        })
    },

    getProducts(page = 1) {
      axios.get(`${getProductsUrl}/?page=${page}`)
        .then(res => {
          this.products = res.data.products;
          this.page = res.data.pagination;
        })
        .catch(err => {
          alert(err.data.message);
        })
    },

    openModal(status, product) { // status判斷開啟狀態
      if (status === 'create') {
        this.isNew = true;
        productModal.show();
        this.tempProduct = {
          imagesUrl: []
        }
      } else if (status === 'edit') {
        this.isNew = false;
        productModal.show();
        this.tempProduct = JSON.parse(JSON.stringify(product)); // 深拷貝，避免編輯時連動
      } else if (status === 'delete') {
        delProductModal.show();
        this.tempProduct = JSON.parse(JSON.stringify(product)); // 取得產品id
      }
    },

    updateProduct(){
      const http = this.isNew ? 'post':'put';
      const url = this.isNew ? addProductUrl:editProductUrl;
      const urlId = this.isNew ? '':`/${this.tempProduct.id}`;
      const result = this.isNew ? '成功新增產品':'成功更新產品';

      axios[http](`${url}${urlId}`,{ data: this.tempProduct })
        .then(() => {
          alert(result);
          this.getProducts(); // 新增、更新、刪除需加入getProducts，產品變動立即更新
          productModal.hide();
        })
    },

    delProduct(){
      axios.delete(`${ delProductUrl }/${ this.tempProduct.id }`)
        .then(res => {
          alert(res.data.message);
          this.getProducts();
          delProductModal.hide();
        })
        .catch(err => {
          alert(err.data.message);
        })
    },

    createImage(){
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    }
  },
  // 區域註冊
  components: {
    delModalView,
    updateModalView,
  }
})

// 全域註冊
app.component('paginationView', paginationView);

app.mount('#app');