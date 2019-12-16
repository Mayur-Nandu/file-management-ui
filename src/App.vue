<template>
  <div id="app">
    <navbar></navbar> 
    <router-view/>
  </div>
  
</template>

<script>
import navbar from './components/navbar'
import EventBus from './event-bus';

export default {
  name: 'App',
  created () {
    EventBus.$emit('checkLogedin', "false");
  },
  components:{ 
    navbar
  }
}
</script>

