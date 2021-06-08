
<template>
  <v-app>
    <div class="home-style">
      <v-row>
        <NavBar />
      </v-row>
      <v-row>
        <MenuCategorys />
      </v-row>
    </div>
    <v-container>
    <v-row>
      <v-col
        class="d-flex align-center justify-space-around flex-wrap"
        xs="12"
        sm="12"
        md="8"
        lg="8"
        xl="8"
      >
        <v-row class="galery d-flex align-start justify-center">
          <v-col
            class="d-flex align-center justify-center"
            xs="4"
            sm="4"
            md="8"
            lg="8"
            xl="8"
          >
          <div v-if="product.uri">
          <lingallery :width="width" :height="height" :items="items" :addons="{ enableLargeView: true }"/>
          </div>
          </v-col>
          <v-col
            class="d-flex align-center "
            xs="1"
            sm="1"
            md="4"
            lg="4"
            xl="4"
          >
            <v-form @submit.prevent="addCart">
              <h2 class="product-name">{{ product.name }}</h2>
              <p class="product-price">{{ formatCurrency(product.price / 100) }}</p>
              <div v-if="product.quantity === 0">
                <v-alert inf>Produto Esgotado</v-alert>
              </div>
              <div v- else class="product-quanty">
                <v-select
                  :items="productAvailable"
                  label="Quantidade"
                  solo
                  v-model="product_qty_select"
                ></v-select>
                <v-btn color="orange" text dark large @click.prevent="addCart">
                  Adicionar ao Carrinho
                  <v-spacer></v-spacer>
                  <v-icon>fa-shopping-cart</v-icon>
                </v-btn>
              </div>
            <div class="calc-shipping">
                <v-text-field
                  label="Insira o Frete"
                  :rules="rules"
                  solo
                  hide-details="auto"
                  v-model="shipping"
                  type="text"
                ></v-text-field>
                <v-btn color="orange" text @click="calcShipping()">
                  Calcular Frete
                  <v-spacer></v-spacer>
                  <v-icon>fa-truck</v-icon>
                </v-btn>
              </div>
                 <div class="shipping">
                <span v-if="shippingPrice === -1"></span>
                <span v-else-if="shippingPrice === 0"><h3>Frete:</h3>Frete Grátis</span>
                <span v-else-if="shippingPrice === -2">Cep Incorreto!</span>
                <span v-else><h3>Frete:</h3>{{ formatCurrency(shippingPrice / 100) }}</span>
              </div>
            </v-form>
            <v-divider inset></v-divider>
          </v-col>
        </v-row>
        <v-row class="details" sm="12" md="12">
          <v-col sm="12" md="12">
            <h2>Descrição</h2>
            <p v-html="product.description">{{ product.description }}</p>
          </v-col>
        </v-row>
        <v-row class="related"></v-row>
      </v-col>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FormatCurrencyMixin from "@/mixins/format-currency";
import Lingallery from 'lingallery';
import NavBar from "@/components/shared/NavBar.vue";
import MenuCategorys from "@/components/shared/MenuCategorys.vue";


export default {
  name: "Showcase",
  mixins: [FormatCurrencyMixin],
  components: {
    NavBar,
    MenuCategorys,
    Lingallery
  },
  data() {
    return {
      rules: [
        (value) => !!value || "Frete é necessário para processeguir!",
        (value) =>
          (value && value.length <= 8) || "Frete precisa ter 8 digitos e apenas números",
      ],
      uri: this.$route.params.uri,
      affiliate: undefined,
      cupom: undefined,

      id: undefined,
      cart_item: undefined,
      product_qty_select: undefined,
      shipping: "",
      width: 400,
      height: 400,
      itemss: [{
        src: 'https://gattorosa.nyc3.digitaloceanspaces.com/VIBRANCE%20CONDICIONADOR.png',
        thumbnail: 'https://gattorosa.nyc3.digitaloceanspaces.com/VIBRANCE%20CONDICIONADOR.png',
      },
      {
        src: 'https://gattorosa.nyc3.digitaloceanspaces.com/WONDER%20LISS%20SHAMPOO.png',
        thumbnail: 'https://gattorosa.nyc3.digitaloceanspaces.com/WONDER%20LISS%20SHAMPOO.png'
      }],
    };
  },
  computed: {
    ...mapState("product", {
      product: "product",
      images: "images"
    },),
    ...mapState("cart",{ shippingPrice: "shippingPrice" }),
    items() {
      let img = this.images
      let img2 = {
        url: this.product.image_path,
      }
      img.unshift(img2)
      return img.map((item) => {
        return {
          src: item.url,
          thumbnail: item.url,
        }
      })
    },
    productAvailable() {
      let _available = [];
      console.log("QTY DETAIL", this.product.quantity);
      if (this.product.quantity > 10) {
        console.log("FOR");
        let n = 1;
        for (n; n <= 10; n++) {
          console.log("Iterações", n);
          _available.push(n);
        }
      } else {
        let n = 1;
        for (n; n <= this.product.quantity; n++) {
          _available.push(n);
        }
      }
      return _available;
    },
  },
  methods: {
    ...mapActions("product", ["getProduct", "setImagesGallery"]),
    ...mapActions("cart", ["addShoppingCart", "setAffiliate", "postCalculateShipping"]),
    ...mapState("cart", {
      state_afilliate: "affiliate",
    }),
    addCart() {
      console.log("QTY ", this.product_qty_select);
      if (!this.product_qty_select) {
        this.product_qty_select = 1;
      }

      this.cart_item = {
        amount: this.product.price,
        qty: this.product_qty_select,
        product_id: this.product.id,
        product_name: this.product.name,
        image_path: this.product.image_path,
        affiliate: this.state_afilliate,
        tangible: true,
      };
      this.addShoppingCart(this.cart_item);
      this.cart_item = undefined;
      this.$router.push({ name: "ShoppingCart" });
    },
    getProductPage() {
      console.log("URI ----", this.uri);
      return this.getProduct({ uri: this.uri });
    },
    async calcShipping() {
      this.cart_item = {
        amount: this.product.price,
        qty: this.product_qty_select,
        product_id: this.product.id,
        product_name: this.product.name,
        image_path: this.product.image_path,
        affiliate: this.state_afilliate,
        tangible: true,
      };
      console.log(this.shipping);
      const sh = await this.postCalculateShipping({
        shipping: this.shipping,
        cart: [this.cart_item],
      });
      console.log("SHIPP", sh);
    },
    isSmallZero(currentValue) {
      return currentValue <= 0;
    },
  },
  created() {
    this.getProductPage(this.uri);
    this.affiliate = this.$route.query.afil;
    console.log("CREATED", this.affiliate);
    if (this.affiliate) {
      this.setAffiliate(this.affiliate);
    }
  },
  updated() {
    this.affiliate = this.$route.query.afil;
    console.log("UPDATE", this.affiliate);
    if (this.affiliate) {
      this.setAffiliate(this.affiliate);
    }
   
  },
  mounted() {
    this.setImagesGallery({product_id: this.uri})
  },
  beforeRouteUpdate(to, from, next) {
    this.affiliate = to.query.afil;
    this.uri = to.params.uri;
    this.cupom = to.query.cupom;
    if (this.affiliate) {
      this.setAffiliate(this.affiliate);
    }
    this.product = this.getProductPage(this.uri);
    
    next();
  },
};
</script>

<style  scoped>
.product-name {
  width: 500px
}
.product-price {
  font-size: 35px;
  color: orange;
  font-weight: bold;
}
.calc-shipping {
  display: flex;
  margin-top: 30px;
}

@media  screen and (max-width: 550px) {
  .product-name {
  width: 400px
}
  
}

</style>
