</<template>
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
            <div class="picker-box">
                <el-date-picker 
                type="daterange" 
                v-model="times" 
                start-placeholder="开始日期"
                end-placeholder="结束日期" 
                 @change="timeChange"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div> 
        </div> 
        <div class="bar">   
            <schart :canvasId="canvasId" :type="type"
                :width="width"
                :height="height"
                :data="barData"
                :options="options"></schart>
         </div>   
         <div class="card"> 
             <div class="card-header">
                 <div>详情</div>
             </div> 
             <div class="code-body">
                <el-table :data="items" border style="width: 100%">
                    <el-table-column prop="name" label="日期"></el-table-column>
                    <el-table-column prop="value" label="时间">
                        <template scope="scope">
                            <span>{{formatStr(scope.row.value)}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>            
        </div>    

  </div>
</template>
<<script>
import * as types from '../../store/mutation-types'
import { mapGetters } from 'vuex'
import Schart from 'vue-schart'

export default {
    mounted() {
        this.fetchData()
    },
    data() {
        const defaultEnd = new Date();
        const defaultStart = new Date();
        defaultStart.setTime(defaultStart.getTime() - 3600 * 1000 * 24 * 7);
        return {
			canvasId: 'myCanvas',
			type: 'bar',
			width: 800,
			height: 400,
			options: {
                title: '用量统计',
                padding: 50,
                yEqual: 5,
                axisColor: '#d1d1d1',
                xLength: 10,
                fillColor: '#00A0E9'
            },
            times: [defaultStart, defaultEnd],
            pickerOptions: {      
               shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }}, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }}]
            }    
            //currentApp: null
		}
    },
    watch: {
        '$route.path' (to, from) {
            if (this.$route.name == 'usage') {
                this.fetchData()
            }
        }
    },
    computed: {
        ...mapGetters({
            items: 'usage/items',
            barData: 'usage/items',
            apps: 'usage/apps',
            currentApp: 'usage/currentApp',
            currentAppType: 'usage/currentAppType'
        })
    },
    methods: {
        formatStr(value) {
            let type = ''
            this.apps.forEach(element => {
                if (element.appId == this.currentApp) {
                    type = element.type
                }
            });
            const key = type == 1 ? '分钟' : '人'
            return value + '/' + key
        },
        fetchData() {
            this.$store.dispatch(`usage/${types.GET_USAGE}`, {})
        },
        appChange(value) {
            //this.currentApp = value
            this.$store.dispatch(`usage/${types.GET_USAGE_BY_ID_AND_TIME}`, {appId: value})
        },
        timeChange(value) {
            //this.currentApp = value
            this.$store.dispatch(`usage/${types.GET_USAGE_BY_ID_AND_TIME}`, {
                appId: this.currentApp,
                startTime: value[0],
                endTime: value[1]
            })
        }
    },
    components:{
		Schart
	}
}
</script>
<style lang="stylus">
    .filter-box
        margin-bottom 20px
        border 1px solid #ddd
        padding 20px
        background #fff
        min-width 400px

    .bar
        background #fff 

    .card-header
        padding 15px 10px
        margin-top 20px
        background-color #f1f3f8
        border 1px solid #e3e8ec

    .picker-box 
        position relative
        display inline-block
        float right 
</style>


