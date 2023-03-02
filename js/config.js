export const apiUrl = "https://vue3-course-api.hexschool.io/v2";
export const apiPath = "ziyi";



// 登入及驗證
export const singinUrl = `${apiUrl}/admin/signin`;       // post
export const logoutUrl = `${apiUrl}/logout`;             // post
export const checkAdminUrl = `${apiUrl}/api/user/check`; // post



// 管理控制台 - 產品
export const getAllProductsUrl = `${apiUrl}/api/${apiPath}/admin/products/all`; // get
export const getProductsUrl = `${apiUrl}/api/${apiPath}/admin/products`;        // get
export const addProductUrl = `${apiUrl}/api/${apiPath}/admin/product`;          // post
export const editProductUrl = `${apiUrl}/api/${apiPath}/admin/product`;         // put {id}
export const delProductUrl = `${apiUrl}/api/${apiPath}/admin/product`;          // delete {id}
