<template>
  <div>
    <h1>Tambah Buku Baru</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label>Kode Buku:</label>
        <input v-model="kodeBuku" required />
      </div>
      <div>
        <label>Judul Buku:</label>
        <input v-model="judul" required />
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
        <input type="number" v-model="harga" required />
      </div>
      <button type="submit">Simpan</button>
      <button type="button" @click="cancel">Batal</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateBook',
  data() {
    return {
      kodeBuku: '',
      judul: '',
      genre: '',
      penulis: '',
      harga: ''
    }
  },
  methods: {
    submitForm() {
      const newBook = {
        kodeBuku: this.kodeBuku,
        judul: this.judul,
        genre: this.genre,
        penulis: this.penulis,
        harga: parseFloat(this.harga)
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
