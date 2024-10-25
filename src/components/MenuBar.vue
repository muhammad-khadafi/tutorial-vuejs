<!-- src/components/MenuBar.vue -->
<template>
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <RouterLink to="/" class="text-decoration-none">
              <v-list-item-content>Home</v-list-item-content>
            </RouterLink>
          </v-list-item>
          <v-list-item>
            <RouterLink to="/create" class="text-decoration-none">
              <v-list-item-content>Tambah Buku</v-list-item-content>
            </RouterLink>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  </script>
  
  <style scoped>
  .text-decoration-none {
    text-decoration: none;
    color: inherit;
  }
  </style>
  