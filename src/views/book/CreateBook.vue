<template>
  <v-container>
    <h1>Tambah Buku Baru</h1>
    <v-form @submit.prevent="submitForm">
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
      <v-btn type="submit" color="primary">Simpan</v-btn>
      <v-btn @click="cancel" color="grey">Batal</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateBook',
  data() {
    return {
      kode_buku: '',
      judul_buku: '',
      genre: '',
      penulis: '',
      harga_buku: ''
    }
  },
  methods: {
    submitForm() {
      const newBook = {
        kodeBuku: this.kode_buku,
        judul: this.judul_buku,
        genre: this.genre,
        penulis: this.penulis,
        harga: parseFloat(this.harga_buku)
      }
      axios.post('http://localhost:8080/api/books', newBook) 
        .then(response => {
          alert('Buku berhasil ditambahkan!')
          this.$router.push('/')
        })
        .catch(error => {
          console.error('Error adding book:', error)
          alert('Terjadi kesalahan saat menambahkan buku.')
        })
    },
    cancel() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
