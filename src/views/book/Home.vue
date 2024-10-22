<template>
  <div>
    <h1>Daftar Buku</h1>
    <router-link to="/create">
      <button>Tambah Buku</button>
    </router-link>
    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Kode Buku</th>
          <th>Judul Buku</th>
          <th>Genre</th>
          <th>Penulis</th>
          <th>Harga Buku</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.kodeBuku }}</td>
          <td>{{ book.judul }}</td>
          <td>{{ book.genre }}</td>
          <td>{{ book.penulis }}</td>
          <td>{{ book.harga }}</td>
          <td>
            <button @click="editBook(book)">Edit</button>
            <button @click="deleteBook(book.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      books: []
    }
  },
  methods: {
    fetchBooks() {
      axios.get('http://localhost:8080/api/books')
        .then(response => {
          this.books = response.data
        })
        .catch(error => {
          console.error('Error fetching books:', error)
        })
    },
    editBook(book) {
      // Menyimpan buku yang dipilih ke dalam state Vuex
      this.$store.dispatch('setSelectedBook', book)
      this.$router.push('/edit')
    },
    deleteBook(id) {
      if (confirm('Apakah anda yakin ingin menghapus buku ini?')) {
        axios.delete(`http://localhost:8080/api/books/${id}`)
          .then(() => {
            this.books = this.books.filter(book => book.id !== id)
            alert('Buku berhasil dihapus!')
          })
          .catch(error => {
            console.error('Error deleting book:', error)
          })
      }
    }
  },
  created() {
    this.fetchBooks()  // Ambil daftar buku saat halaman dimuat
  }
}
</script>

<style scoped>
  table {
    width: 100%;
    margin-top: 20px;
  }
  th, td {
    text-align: left;
  }
  button {
    margin-right: 5px;
  }
  </style>
  