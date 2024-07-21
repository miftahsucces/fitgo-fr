<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center" :style="backgroundStyle">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="submitLogin">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput v-model="form.email" placeholder="Username" autocomplete="username" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput v-model="form.password" type="password" placeholder="Password"
                      autocomplete="current-password" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton type="submit" color="primary" class="px-4"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0"> Forgot password? </CButton>
                    </CCol>
                  </CRow>
                  <CRow v-if="loginError" class="mb-4 mt-3">
                    <CCol>
                      <CAlert color="danger">{{ loginError }}</CAlert>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3"> Register Now! </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>



<script>
import { ref,reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { login } from '@/services/auth_service'

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    // const form = ref({
    //   email: '',
    //   password: ''
    // });
    const form = reactive({
      email: '',
      password: '',
    })

    const loginError = ref('');
    const submitLogin = async () => {
      try {
        const response = await login(form)
        authStore.setUser(response.data.user)
        authStore.setToken(response.data.access_token)
        router.push('/')
      } catch (error) {
        // loginError.value = error.response.data.errors
        loginError.value = 'Invalid email or password. Please try again.';
      }
    }

    const backgroundStyle = {
      backgroundImage: 'url(/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };

    return {
      form,
      submitLogin,
      loginError,
      backgroundStyle
    };
  }
}
</script>
