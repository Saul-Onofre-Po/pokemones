<template>
<div>

<div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 0px #000"
    fade
    indicators
    img-width="1024"
    img-height="280"
  >
    <b-carousel-slide
      caption=""
      img-src="https://images6.alphacoders.com/475/475761.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption=""
      img-src="https://images6.alphacoders.com/519/519728.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption=""
      img-src="https://images6.alphacoders.com/648/648603.jpg "
    ></b-carousel-slide>
  </b-carousel>
</div>




  {{validShow}}
  <b-row cols="3" v-if="arrayBlog.length != 0  ">
  <b-card-group v-for="(item,index) in arrayBlog" :key="item.id">
    <b-overlay :show="show" rounded="sm">
      <b-card  title="" :img-src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+(item.id)+'.png'" alt="Image" class="rounded-0">
        <b-card-text >
        <h2>{{item.id}} - {{item.name}}</h2>
        </b-card-text>
        <b-button @click="Seleccionar(item,index)" pill variant="outline-primary">
          {{item.captched ? 'Liberar' : 'Capturar'}}
          <b-icon icon="hand-thumbs-up"></b-icon>
        </b-button>
        <template #footer header-bg-variant="primary">
          <small class="text-muted">POKEMONES</small>
        </template>
      </b-card>
    </b-overlay>
  </b-card-group>
  </b-row>


<!-----------------------INFORMACIÓN POKEMON------------------>
  <div>

    <b-modal ref="my-modal" hide-footer header-bg-variant="primary">
      <div class="d-block text-center">
        <img :src="imagen" class="img-fluid rounded mx-auto d-block" style="width: 50%; height: 50%;" alt="">
        <h3>Nombre Pokemon: {{namepokemon}}</h3>
        <h3>Movimiento: {{movimientopokemon}}</h3>
        <h3>Tipo: {{tipopokemon}}</h3>
        <h3>Altura: {{alturapokemon}} cm</h3>
        <h3>Peso: {{pesopokemon}} kg</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">CERRAR</b-button>
    </b-modal>
  </div>

<!-----------------------INFORMACIÓN FAVORITOS------------------>

    <div>
    <b-icon style="position: fixed;
    bottom: 40px;
	  right: 40px;
	  transition: all 300ms ease 0ms;
	  box-shadow: 0px 8px 15px rgb(252, 248, 248);
	  z-index: 99;" 
    icon="star-fill" scale="1.5" animation="spin" font-scale="5" variant="warning" v-b-toggle.sidebar-footer
    v-b-tooltip.hover title="FAVORITOS"></b-icon>
    <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" title="FAVORITOS" shadow>
      <template #footer="{ hide }">
       <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <strong class="mr-auto">POKEMONES</strong>
        <b-button size="sm" @click="hide">Cerrar</b-button>
       </div>
      </template>
      <div class="px-3 py-2" v-for="(item,index) in arrayFavoritos" :key="index">
        <p>
          <h3>{{item.name}}</h3>
          <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+(item.id)+'.png'" class="img-fluid rounded mx-auto d-block" style="width: 50%; height: 50%;" alt="">

        <b-button variant="outline-danger" @click="eliminar(index)">Liberar
        <b-icon icon="trash-fill" scale="1" variant="dark"></b-icon>
        </b-button>
      </div>
    </b-sidebar>
  </div>

</div>

</template>

<script>
// @ is an alias to /src
//import {mapState,mapMutations,mapActions} from 'vuex' //cuando seusa mapState o comutaciones se agrega elimport
import {mapState,mapMutations} from 'vuex';
import axios from "axios";


export default {
  name: 'Home',

  data(){
        return{
            titulo: 'Pokemones',
            arrayBlog: [],
            //arrayFavoritos: [],
            imagen:'',
            namepokemon:'',
            movimientopokemon:'', 
            tipopokemon: '',
            alturapokemon:'',
            pesopokemon:'',
            idPokemon: '',
            show: true,
            num: 0,
        }
    },
  
  methods:{
    ...mapMutations(['validarFavoritos']),

    hideModal() {
        this.$refs['my-modal'].hide()
    },
    async consumirPokemon(){
      try{ 
              for (let index = 0; index < 20; index++) {
              const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index+1}`)
              this.arrayBlog[index] = data.data;
              this.num++;
           //  console.log(data)
               const index1 =  this.arrayFavoritos.findIndex(poke =>   poke.id == this.arrayBlog[index].id )
              if (index1 == -1) {
                  this.arrayBlog[index].captched = false
              }else{
                  this.arrayBlog[index].captched = true
              }
              }
             console.log(this.arrayBlog)
      }catch(error){
          console.log(error)
      }
    },
    Seleccionar(item,index) {
            if (this.arrayBlog[index].captched == false) {
           // console.log(item)
            this.arrayBlog[index].captched = true
            this.namepokemon = item.name
            this.movimientopokemon = item.moves[0].move.name
            this. tipopokemon = item.types[0].type.name
            this.alturapokemon =item.height
            this.pesopokemon = item.weight
            this.imagen = item.sprites.other.dream_world.front_default
            this.idPokemon = item.id
           // console.log(item.id)
           // this.urlpokemon = item.url
           // this.result = item.abilities.ability
           this.$refs['my-modal'].show()
           this.arrayFavoritos.push({'id': item.id, 'name': item.name, 'captched': item.captched});
            console.log(this.arrayFavoritos)
            localStorage.setItem('datos', JSON.stringify(this.arrayFavoritos));
            let value = JSON.parse(localStorage.getItem("session"));
            }else{
              const index1 =  this.arrayFavoritos.findIndex(poke =>   poke.id == item.id )
              console.log(index1)
              this.arrayFavoritos.splice(index1, 1);
              localStorage.setItem('datos', JSON.stringify(this.arrayFavoritos)); 
              this.arrayBlog[index].captched = false
              
            }
          
    },
    eliminar(index){
        //  console.log(index)
              this.arrayFavoritos.splice(index, 1);               
              localStorage.setItem('datos', JSON.stringify(this.arrayFavoritos)); 
              const index2 =  this.arrayFavoritos.findIndex(poke =>   poke.id == this.arrayBlog[index].id )
              if (index2 == 1) {
                  this.arrayBlog[index].captched = true
              }else{
                  this.arrayBlog[index].captched = false  
              }
          console.log(this.arrayFavoritos)
          
    },
    buscar(){
      const buscar =  this.arrayBlog.filter(poke =>   poke.name == 'bulbasaur' )
      alert(buscar)
     
    }
  },

  computed:{
    ...mapState(['arrayFavoritos']),

    validShow(){
      this.show = this.num == 20 ? false : true;
    }

  },
 created(){
   this.consumirPokemon()
   this.validarFavoritos()
   //localStorage.setItem("Apellido", 'onofre');
 }
}

</script>
