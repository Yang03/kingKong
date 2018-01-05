<template>
    <div class="container">
        <div class="filter-box">
            <el-select :value="currentApp" filterable placeholder="请选择" @change="appChange">
                <el-option
                v-for="item in apps"
                :key="item.appId"
                :label="item.appName"
                :value="item.appId">
                </el-option>
            </el-select>
            <el-button type="primary" @click="visible= true">创建项目</el-button>
        </div> 
        <div>
            <div class="card" v-if="app">
                 <ul>
                     <li>
                         <label>项目名称:</label>
                         <span>{{app.appName}}</span>
                     </li>
                      <li>
                         <label>appId:</label>
                         <span>{{app.id}}</span>
                     </li>
                      <li>
                         <label>appKey:</label>
                         <span>{{app.appkey}}</span>
                     </li>
                     <li>
                         <label>付费方式:</label>
                         <span>{{getType(app.type)}}</span>
                     </li>
                 </ul>       
            </div>
        </div> 
        <el-dialog title="创建项目" :visible.sync="visible">
        <el-form :model="appForm">
            <el-form-item label="项目名称" label-width="100px">
            <el-input v-model="appForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="付费方式" label-width="100px">
            <el-select v-model="appForm.type" placeholder="请选择">
                <el-option v-for="item in selectOpt" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible= false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
        </el-dialog>              
    </div>          
</template>
<script>
import * as types from '../../store/mutation-types'
import { mapGetters } from 'vuex'

export default {
   data(){
       return {
           visible: false,
           appForm: {
               name: '',
               type: 1
           },
           selectOpt: [
               {
                   label: '按时间',
                   value: 1
               }, {
                   label: '按dau',
                   value: 2
               }
           ]
       }
   } ,
   mounted() {
        this.fetchData()
    },
    computed: {
        ...mapGetters({
            apps: 'project/apps',
            currentApp: 'project/currentApp',
            app: 'project/app'
        })
    },
    watch: {
        '$route.path' (to, from) {
            if (this.$route.name == 'project') {
                this.fetchData()
            }
        }
    },
     methods: {
        fetchData() {
            this.$store.dispatch(`project/${types.GET_PROJECT}`)
        },
        appChange(value) {
            this.$store.dispatch(`project/${types.PROJECT_CHANGE}`, value)
        },
        submit() {
            this.visible = false
            this.$store.dispatch(`project/${types.CRATE_PROJECT}`, this.appForm)
        },
        getType(type) {
            const config = {1:'时长', 2:'DAU'}
            console.log(type)
            return config.type
        }
    }
}
</script>
<style lang="stylus" scoped>
    .card 
        padding 15px 20px
        background #fff
        border 1px solid #ddd
        ul li
            list-style none 
            height 36px
            line-height 36px
</style>


