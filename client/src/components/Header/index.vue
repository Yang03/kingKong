<<template>
    <div>
        <header class="header">
             <div class="logo">Valley.ren</div>
                <div class="user-info">
                    <span>{{userName}}</span>
                    <a href="javascript:;" v-on:click="loginOut">退出</a>
                </div>            
        </header>
    </div>       
</template>
<script>
import cookie from 'js-cookie'
import { loginOut } from '../../api/user'
export default {
    data() {
        return {
            userName: decodeURIComponent(cookie.get('userName'))
        }
    },
    methods: {
        loginOut() {
             loginOut().then(() => {
                this.$router.push({
                    path: 'login'
                })
             })    
        }
    }
}
</script>
<style scope="scope" lang="stylus">
    header 
        height 60px
        background-color #eef1f6
        color #333
        top 0
        right 0
        left 0
        position fixed
        line-height 60px
        z-index 100
        border-bottom 1px solid #D9DEE4
    
    .title 
        padding-left 20px

    
    .user-info
        position absolute
        right 
        top 20px
        margin-right 20px
        color #666

        span
            padding 0 10px
            border-right 1px solid #d1d1d1

        a
            padding 0 10px
            color #409EFF 
            text-decoration none

    .logo
        background #324157   
        width 220px
        height 60px
        line-height 60px
        padding-left 20px 
        font-size 18px
        color #fff
        display inline-block
     
    
</style>


