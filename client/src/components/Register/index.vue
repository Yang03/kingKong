<template>
    <div class="register-form-box">
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px">
            <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="设置密码" prop="password">
                <el-input v-model="registerForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repeatPassword">
                <el-input v-model="registerForm.repeatPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="用户名称" prop="name">
                <el-input v-model="registerForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司名称" prop="company">
                <el-input v-model="registerForm.company"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="registerForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="公司类型" prop="companyType">
                 <el-select v-model='registerForm.companyType' placeholder="请选择公司类型">
                    <el-option
                    v-for="item in companyTypeList"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                <span class="login-link">
                    <router-link to="/login">已有账号？去登录</router-link>
                </span>    
            </el-form-item>
        </el-form>
    </div>        
</template>

<script>
import {companyType as companyTypeList} from '../../config/companyType'
import { register, checkEmail } from '../../api/user'
export default {
    data(){
         const validatePwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        const validateMobile = (rule, value, callback) => {
            if (!(/^1[345789]\d{9}$/.test(value))) {
                 callback(new Error('手机号码格式不正确'))  
            } else {
                callback()
            }
        }
        const validateEmail = (rule, value, callback) => {
            if (!value) {
                 callback(new Error('手机号码格式不正确'))  
            } else if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))){
                callback(new Error('请输入正确的邮箱地址')) 
            } else {
                 checkEmail(value).then((res) => {
                     if (res.data.code) {
                         callback(new Error(res.data.message))
                     }
                 })
                 callback()   
            }
        }
        return {
            registerForm: {
                 email:'',
                 password: '',
                 repeatPassword:'',  
                 name: '', 
                 company: '',
                 mobile:'',
                 companyType:''
            },
            companyTypeList: companyTypeList,
            rules: {
                email: [
                    { 
                        required: true, message: '请输入邮箱地址', trigger: 'blur' 
                    },
                    {validator: validateEmail, trigger: 'blur'}
                    // { 
                    //     required: true, message: '请输入邮箱地址', trigger: 'blur'
                    // }, {
                    //     type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'
                    // }
                ],
                password: [{ 
                    required: true, message: '请输入密码', trigger: 'blur' 
                },{
                     min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur'
                }],
                repeatPassword: [
                    {required: true, message: '请输入密码'},
                    {validator: validatePwd, trigger: 'blur'}
                ],
                name: [
                    { required: true, message: '请选择用户名称', trigger: 'blur' }
                ],
                company: [
                    {required: true, message: '请输入公司名称', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator: validateMobile, trigger: 'blur' }
                    //{ type: , message: '请输入正确的手机号', trigger: 'blur' }
                ],
                companyType: [
                    { type: 'integer', required: true, message: '请选择公司类型', trigger: 'blur' }
                ] 
            }    
        }
    },
    methods: {
        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                   register(this.registerForm).then((res) => {
                        //登录页面
                        this.$router.push({
                            path: 'login'
                        })
                   })
                }
            })   
        }
    }    
}
</script>

<style lang="stylus">
    .register-form-box 
        width 400px
        background rgba(255,255,255, 0.1)
        padding 50px 60px 30px 20px
        border-radius 10px
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        .el-select 
            width 300px

        .el-form-item__label 
            color #fff
        .el-input__inner
            background-color rgba(255,255,255, 0.1)
            color #fff
        .login-link a 
            padding-left 100px 
            text-decoration none
            color #fff    


    
</style>

