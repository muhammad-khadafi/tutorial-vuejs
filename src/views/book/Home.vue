<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
    <h1>Daftar Buku</h1>
    <router-link to="/create">
      <v-btn color="primary">Tambah Buku</v-btn>
    </router-link>
  </div>
    <!-- Search Field -->
    <v-row class="justify-end">
      <v-col cols="3">
    <v-text-field
      v-model="search"
      label="Cari Buku"
      clearable
      class="mb-3 mt-4" 
    ></v-text-field></v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredBooks"
      class="elevation-1"
      :search="search"
      style="width: 100%;" 
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Daftar Buku</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn @click="editBook(item)" class="mr-2">Edit</v-btn>
        <v-btn @click="deleteBook(item.id)" color="red">Hapus</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      books: [],
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Kode Buku', value: 'kodeBuku' },
        { text: 'Judul Buku', value: 'judul' },
        { text: 'Genre', value: 'genre' },
        { text: 'Penulis', value: 'penulis' },
        { text: 'Harga Buku', value: 'harga' },
        { text: 'Aksi', value: 'action', sortable: false }
      ]
    }
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        const searchTerm = this.search.toLowerCase()
        return (
          (book.judul && book.judul.toLowerCase().includes(searchTerm)) ||
          (book.penulis && book.penulis.toLowerCase().includes(searchTerm)) ||
          (book.genre && book.genre.toLowerCase().includes(searchTerm))
        )
      })
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
    this.fetchBooks()
  }
}
</script>
