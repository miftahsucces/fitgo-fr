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
                    <CFormInput v-model="form.password" type="password" placeholder="Password" autocomplete="current-password" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton type="submit" color="primary" class="px-4"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0"> Forgot password? </CButton>
                    </CCol>
                  </CRow>
                  <CRow v-if="loginError" class="mb-4">
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const router = useRouter();

    const form = ref({
      email: '',
      password: ''
    });

    const loginError = ref('');

    const getToken = async () => {
      await axios.get('/sanctum/csrf-cookie')
    };

    const submitLogin = async () => {
      try {
        await getToken();
        const response = await axios.post('/login', {
          email: form.value.email,
          password: form.value.password
        });
        console.log(response.data);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('roles', response.data.role_user);

        router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
        if (error.response.status === 422) {
          loginError.value = 'Invalid email or password. Please try again.';
        } else {
          loginError.value = 'Login failed. Please try again later.';
        }
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
