<template>
    <div :id="$route.name">
        <Header v-if="!showComponents"/>
        <SideNav v-if="!showComponents" />
        <div :class="contentClassName">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view class="view" :key="$route.path"></router-view>
                </keep-alive>      
            </transition> 
        </div>    
    </div>
</template>
<script>
export default {
    computed: {
        showComponents() {
            return this.$route.name == 'register' || this.$route.name == 'login'
        },
        contentClassName() {
            return this.showComponents ? '' : 'content'
        }
    }
}
</script>
<style> 
    * {margin:0; padding: 0}
    body {
        background: #f6f8fa
    }    
    .content {
        margin: 100px 0 0 240px;
    }
    .container {
        min-width: 900px;
        margin: 0 50px; 
    }
    #register, #login {
        position: absolute;
        left: 0;
        right: 0;
        top:0;
        bottom:0;
        background: #2d3a4b;
        overflow: hidden
    }
</style>
