<<template>
    <div class="side-nav">
        <div class="logo">Valley.ren</div>
        <div class="el-row">
            <div class="el-col">
                <el-menu mode="vertical" unique-opend="true" :default-active="defaultActive" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff">
                    <template v-for="item in items">
                        <el-menu-item class="nav-item" v-if="!item.subItems" :index="item.index">
                             <router-link :to="item.path">{{item.name}}</router-link>
                        </el-menu-item>
                        <el-submenu v-else :index="item.index">
                            <template slot="title">{{item.name}}</template>
                            <el-menu-item-group>
                                <el-menu-item  v-for="subItem in item.subItems" :key="subItem.index" :index="item.index">
                                    <router-link :to="subItem.path">{{subItem.name}}</router-link>
                                </el-menu-item> 
                            </el-menu-item-group>
                        </el-submenu>       
                    </template>
                </el-menu>    
            </div>   
        </div>
    </div>
</template>
<<script>
import { sideMenu }  from '../../config/subMenu'
export default {
    data(){
        return {
            items: sideMenu,
            defaultActive: '1'
        }    
    }
}
</script>
<style scope="scope">
    .side-nav {
        position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		background: #324157;
		width: 200px;
    }
    .side-nav a {
		color: inherit;
		text-decoration: none;
		display: block;
	}
    .side-nav .is-opened {
		background: #d1dbe5;
       
	}
    .el-submenu__title {
         box-shadow: rgba(0, 0, 0, 0.25) 0 1px 0, inset rgba(255, 255, 255, 0.16) 0 1px 0;    
    }
    .el-menu-item-group .el-menu-item {
		background: #1f2d3d !important
	} 
    .el-menu-item-group__title {
		display: none;
	}
    .el-menu {
        border: none !important
    }
    .logo {
        width: 240px;
        height: 60px;
        line-height: 60px;
        padding-left: 20px; 
        font-size: 18px;
        color: #fff
    }
</style>

