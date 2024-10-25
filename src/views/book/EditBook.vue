<template>
  <v-container>
    <h1>Edit Buku</h1>
    <v-form v-if="book" @submit.prevent="submitForm">
      <v-text-field
        label="Kode Buku"
        v-model="kode_buku"
        required
      ></v-text-field>
      <v-text-field
        label="Judul Buku"
        v-model="judul_buku"
        required
      ></v-text-field>
      <v-text-field
        label="Genre"
        v-model="genre"
        required
      ></v-text-field>
      <v-text-field
        label="Penulis"
        v-model="penulis"
        required
      ></v-text-field>
      <v-text-field
        label="Harga Buku"
        type="number"
        v-model="harga_buku"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Perbarui</v-btn>
      <v-btn @click="cancel" color="grey">Batal</v-btn>
    </v-form>
    <p v-else>Loading...</p>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditBook',
  data() {
    return {
      kode_buku: '',
      judul_buku: '',
      genre: '',
      penulis: '',
      harga_buku: ''
    }
  },
  computed: {
    ...mapGetters(['selectedBook']),
    book() {
      return this.selectedBook
    }
  },
  methods: {
    ...mapActions(['clearSelectedBook']),
    fetchBookDetails() {
      if (this.book) {
        this.kode_buku = this.book.kodeBuku
        this.judul_buku = this.book.judul
        this.genre = this.book.genre
        this.penulis = this.book.penulis
        this.harga_buku = this.book.harga
      } else {
        alert('Tidak ada buku yang dipilih untuk diedit.')
        this.$router.push('/')
      }
    },
    submitForm() {
      const updatedBook = {
        id: this.book.id,
        kodeBuku: this.kode_buku,
        judul: this.judul_buku,
        genre: this.genre,
        penulis: this.penulis,
        harga: parseFloat(this.harga_buku)
      }
      axios.put(`http://localhost:8080/api/books/${updatedBook.id}`, updatedBook) 
        .then(response => {
          alert('Buku berhasil diperbarui!')
          this.clearSelectedBook()
          this.$router.push('/')
        })
        .catch(error => {
          console.error('Error updating book:', error)
          alert('Terjadi kesalahan saat memperbarui buku.')
        })
    },
    cancel() {
      this.clearSelectedBook()
      this.$router.push('/')
    }
  },
  created() {
    this.fetchBookDetails()
  }
}
</script>

<style scoped>
</style>
