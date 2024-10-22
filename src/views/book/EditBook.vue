<template>
  <div>
    <h1>Edit Buku</h1>
    <form v-if="book" @submit.prevent="submitForm">
      <div>
        <label>Kode Buku:</label>
        <input v-model="kode_buku" required />
      </div>
      <div>
        <label>Judul Buku:</label>
        <input v-model="judul_buku" required />
      </div>
      <div>
        <label>Genre:</label>
        <input v-model="genre" required />
      </div>
      <div>
        <label>Penulis:</label>
        <input v-model="penulis" required />
      </div>
      <div>
        <label>Harga Buku:</label>
        <input type="number" v-model="harga_buku" required />
      </div>
      <button type="submit">Perbarui</button>
      <button type="button" @click="cancel">Batal</button>
    </form>
    <p v-else>Loading...</p>
  </div>
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
        // Copy data dari Vuex ke data lokal
        this.kode_buku = this.book.kodeBuku
        this.judul_buku = this.book.judul
        this.genre = this.book.genre
        this.penulis = this.book.penulis
        this.harga_buku = this.book.harga
      } else {
        // Jika tidak ada buku yang dipilih, arahkan kembali ke halaman daftar
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
form {
  max-width: 400px;
}
div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input, textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  margin-right: 10px;
}
</style>
