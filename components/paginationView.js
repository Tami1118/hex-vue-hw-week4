
export default {
  props: ['pages','getProducts'],
  template: `
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"
            :class="{ disabled: !pages.has_pre }">
          <a class="page-link" href="#" aria-label="Next"
             @click="getProducts(1)">
            <span aria-hidden="true">First</span>
          </a>
        </li>


        <li class="page-item"
            :class="{ disabled: !pages.has_pre }">
          <a class="page-link" href="#" aria-label="Previous"
             @click="getProducts(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item"
            v-for="page in pages.total_pages" :key="page + '123'"
            :class="{ active: page === pages.current_page }">
          <a class="page-link" href="#"
             @click.prevent="getProducts(page)">{{page}}</a>
        </li>

        <li class="page-item"
            :class="{ disabled: !pages.has_next }">
          <a class="page-link" href="#" aria-label="Next"
             @click="getProducts(pages.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>

        <li class="page-item"
            :class="{ disabled: !pages.has_next }">
          <a class="page-link" href="#" aria-label="Next"
             @click="getProducts(pages.total_pages)">
            <span aria-hidden="true">Last</span>
          </a>
        </li>
      </ul>
    </nav>`,
}


