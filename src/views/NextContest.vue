<template>
    <div>
      <h1>Dump</h1>
      <span>(Axios) API HTTP GET Response: <b>https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena</b></span>
      <code>
        dataProximoConcurso: <b>{{ dataProximoConcurso }}</b><br />
        numeroConcursoProximo: <b>{{ numeroConcursoProximo }}</b><br />
        valorEstimadoProximoConcurso: <b>{{ valorEstimadoProximoConcurso }}</b><br />
        tipoJogo: <b>{{ tipoJogo }}</b><br />
      </code>
      <div class="flex">
        <button @click="addData" v-if="new Date().getDay() == 3 || new Date().getDay() == 4 || new Date().getDay() == 6 || new Date().getDay() == 0 && new Date().getHours() >= 8">
          REGISTER
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import nextColRef from '@/server/nextcolref'
  import { addDoc } from '@firebase/firestore'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        dataProximoConcurso: null,
        numeroConcursoProximo: null,
        valorEstimadoProximoConcurso: null,
        tipoJogo: null
      }
    },
    methods: {
      async apiGetResponse () {
        axios.get('http://localhost:8080/portaldeloterias/api/megasena', {headers: { 'ContentType': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' }})
        .then(response => (
          this.dataProximoConcurso = response.data.dataProximoConcurso,
          this.numeroConcursoProximo = response.data.numeroConcursoProximo,
          this.valorEstimadoProximoConcurso = response.data.valorEstimadoProximoConcurso,
          this.tipoJogo = response.data.tipoJogo
        ))
      },
      async addData () {
        await addDoc(nextColRef, this.$data)
        this.dataProximoConcurso = null
        this.numeroConcursoProximo = null
        this.valorEstimadoProximoConcurso = null
        this.tipoJogo = null
        this.$router.push('/dump')
      }
    },
    created() {
      this.apiGetResponse()
    }
  }
  </script>
  
  <style scoped>
    code {
      color: #464646;
    }
    button {
      padding: 10px 25px;
      border: none;
      border-radius: 5px;
      background: orangered;
      color: #FFF;
      cursor: pointer;
      transition: .4s ease all;
      display: table;
      margin-top: 2rem;
      margin-left: 2rem;
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      font-weight: 500;
    }
    button:hover {
      background: rgb(235, 64, 2);
    }
    .next {
      padding: 10px 25px;
      border: none;
      border-radius: 5px;
      background: #c6c6c6;
      color: #464646;
      cursor: pointer;
      transition: .4s ease all;
      display: table;
      margin-top: 2rem;
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
    }
    .next:hover {
      background: #999999;
    }
  
    h1 {
        font-size: 25px;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        margin: 0 2rem;
        color: #464646;
    }
    span {
        font-size: 15px;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        margin: 0 2rem;
        color: orange;
    }
    code {
        padding: 10px 2rem;
        width: 100%;
        display: table;
        box-sizing: border-box;
        color: #464646;
    }
    b {
        font-family: 'Poppins', sans-serif;
        color: orangered;
        font-weight: 500;
        font-size: 14px;
    }
    .flex {
      display: flex;
      gap: 20px;
    }
  </style>
  