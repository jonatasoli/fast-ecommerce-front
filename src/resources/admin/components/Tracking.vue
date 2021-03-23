<template>
  <div>
    <v-dialog v-model="dialog" max-width="700px">
        <v-card>
            <v-card-title>
                <span class="headline">Código de Rastreio</span>
            </v-card-title>
            <v-card-text>
                <v-col>
                    <v-text-field
                    v-model="editedItem.tracking"
                    label="Código de Rastreio"></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    
                >
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-icon
      dense
      class="mr-2"
      @click="editItem(item)"
    >
      mdi-plus-circle
    </v-icon>
  </div>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";
import { createNamespacedHelpers } from "vuex";
const { mapActions} = createNamespacedHelpers(
  "productAdmin"
);
export default {
  props: ["item", "items"],
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      id: 0,
      editedItem: {
        tracking: '',
        id_payment: 0,
        order_id:0,
        user_email: '',
      },
      dialog: false,
      editedIndex: -1
    }
  },
  methods: {
    ...mapActions([
      "postTrackingNumber",
      "sendEmailTrackingNumber"]),
    close() {
      this.dialog = false
      this.editedItem.tracking = ''
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
        this.sendEmailTrackingNumber(
          {
            "mail_to": this.editedItem.user_email,
            "order_id": this.editedItem.order_id,
            "tracking_number": this.editedItem.tracking
          }
        )
        this.postTrackingNumber(this.editedItem)
      }
      this.dialog = false;
      location.reload()
    },
    editItem(item) {
      if (item.tracking == null) {
        this.editedIndex = this.items.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
        }
      else {
        window.alert("Código de Rastreio já inserido")
        this.dialog = false;
      }  
    },
  },
}
</script>

<style>

</style>