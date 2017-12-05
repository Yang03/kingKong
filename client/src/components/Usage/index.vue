</<template>
  <div class="container">
        <schart :canvasId="canvasId" :type="type"
			:width="width"
			:height="height"
			:data="barData"
			:options="options"></schart>
         <div class="card"> 
             <div class="card-header">
                 <div>详情</div>
             </div> 
             <div class="code-body">
                <el-table :data="items" border style="width: 100%">
                    <el-table-column prop="name" label="日期"></el-table-column>
                    <el-table-column prop="value" label="时间">
                        <template scope="scope">
                        <span>{{scope.row.value}}/分钟</span>
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
			}
		}
    
    },
    watch: {
        '$route.path' (to, from) {
            console.log(this.$route.name)
            if (this.$route.name == 'usage') {
                this.fetchData()
            }
        }
    },
    computed: {
        ...mapGetters({
            items: 'usage/items',
            barData: 'usage/items'
        })
    },
    methods: {
        fetchData() {
            this.$store.dispatch(`usage/${types.GET_USAGE}`, {})
        }
    },
    components:{
		Schart
	}
}
</script>
<style lang="stylus">
    .card-header
        padding 15px 10px
        background-color #f1f3f8
        border 1px solid #e3e8ec
</style>


