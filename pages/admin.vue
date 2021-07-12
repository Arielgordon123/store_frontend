<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="$store.state.products"
      disable-filtering
      disable-items-per-page
      disable-sort
      disable-pagination
      :hide-default-footer="true"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Product name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.imageUrl"
                        label="Image Url"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.desc"
                        label="description"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.option`]="{ item }">
        <v-btn color="warning" @click="editItem(item)">
          <v-icon small class="mr-2"> mdi-pencil </v-icon> edit
        </v-btn>
        <v-btn color="error" @click="deleteItem(item)">
          <v-icon small> mdi-delete </v-icon> delete
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  asyncData({ store }) {
    return store.dispatch('getAllProducts')
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Title',

          value: 'name',
        },
        { text: 'Price', value: 'price' },
        { text: 'Option', value: 'option' },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        price: 0,
        desc: '',
        imageUrl: '',
      },
      defaultItem: {
        name: '',
        price: 0,
        desc: '',
        imageUrl: `https://picsum.photos/300?${Math.floor(
          Math.random() * 100
        )}`,
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    ...mapActions(['deleteProduct', 'updateProduct', 'createProduct']),
    editItem(item) {
      this.editedIndex = 1
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = item._id
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteProduct(this.editedIndex)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    initialize() {},
    save() {
      if (this.editedIndex > -1) {
        this.updateProduct(this.editedItem)
      } else {
        this.createProduct(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped></style>
