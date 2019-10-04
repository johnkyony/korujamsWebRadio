<template>
<div>
<Navbar></Navbar>
<Tabs></Tabs>
<tab-pane></tab-pane>
  

</div>

  
</template>

<script>
import Navbar from '@/components/Navbar'
import Tabs from '@/components/Tabs'
import TabPane from '@/components/TabPane'
export default {
  components: {
    Navbar, 
    Tabs,
    TabPane
  }
  
}
</script>


