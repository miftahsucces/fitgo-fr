<template>
    <CRow>
        <CCol :xs="12" :md="4">
            <CCard class="text-center profile-card mb-3">
                <CCardBody>
                    <div class="profile-photo mb-3">
                        <img :src="profilePhotoUrl" alt="Profile Photo" class="img-fluid rounded-circle custom-photo" />
                    </div>
                    <CButton color="secondary" @click="triggerFileInput" class="btn-sm mb-3">Change Profile Photo
                    </CButton>
                    <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" id="profile_foto"
                        name="profile_foto" />
                    <h5 class="card-title">{{ formData.fullName }}</h5>
                    <p class="card-text">{{ formData.position }}</p>
                    <p class="card-text">{{ formData.bio }}</p>
                    <div class="social-links mt-3">
                        <a href="#" class="btn btn-outline-light btn-sm me-2"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="btn btn-outline-light btn-sm me-2"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="btn btn-outline-light btn-sm"><i class="fab fa-google"></i></a>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12" :md="8">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Profile User</strong>
                </CCardHeader>
                <CCardBody>
                    <CFormGroup>
                        <CForm class="row g-3 mb-3">
                            <CCol md="6">
                                <CFormLabel for="memberId">ID Anggota</CFormLabel>
                                <CFormInput type="hidden" id="inputIdUser" v-model="formData.inputIdUser"/>
                                <CFormInput type="text" id="memberId" v-model="formData.memberId" required disabled/>
                            </CCol>
                            <CCol xs="6">
                                <CFormLabel for="fullName">Nama Lengkap</CFormLabel>
                                <CFormInput type="text" id="fullName" v-model="formData.fullName" required />
                            </CCol>
                            <CCol xs="6">
                                <CFormLabel for="email">Email</CFormLabel>
                                <CFormInput type="email" id="email" v-model="formData.email" required />
                            </CCol>
                            <CCol xs="6">
                                <CFormLabel for="nohp">No. HP</CFormLabel>
                                <CFormInput type="text" id="nohp" v-model="formData.nohp" required />
                            </CCol>
                            <CCol md="6">
                                <CFormLabel for="gender">Jenis Kelamin</CFormLabel>
                                <CFormSelect id="gender" v-model="formData.gender" required>
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="p">Laki-laki</option>
                                    <option value="w">Perempuan</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md="6">
                                <CFormLabel for="dob">Tanggal Lahir</CFormLabel>
                                <CFormInput type="date" id="dob" v-model="formData.dob" required />
                            </CCol>
                            <CCol md="4">
                                <CFormLabel for="height">Tinggi Badan</CFormLabel>
                                <CFormInput type="number" id="height" v-model="formData.height" required />
                            </CCol>
                            <CCol md="4">
                                <CFormLabel for="weight">Berat Badan</CFormLabel>
                                <CFormInput type="number" id="weight" v-model="formData.weight" required />
                            </CCol>
                            <CCol md="4">
                                <CFormLabel for="bloodType">Golongan Darah</CFormLabel>
                                <CFormSelect id="bloodType" v-model="formData.bloodType" required>
                                    <option value="">Pilih Golongan Darah</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md="12">
                                <CFormLabel for="address">Alamat</CFormLabel>
                                <CFormTextarea id="address" v-model="formData.address" rows="3" required>
                                </CFormTextarea>
                            </CCol>
                            
                            <CCol xs="6">
                                <CFormLabel for="password">Password</CFormLabel>
                                <CFormInput type="password" id="password" v-model="formData.password" required />
                            </CCol>
                            <CCol xs="6">
                                <CFormLabel for="repassword">Re-Password</CFormLabel>
                                <CFormInput type="password" id="repassword" v-model="formData.repassword" required />
                            </CCol>
                            <div v-if="formData.memberType === '3'">
                                
                                <CCol md="12">
                                    <CFormLabel for="dailyActivity">Aktifitas Harian</CFormLabel>
                                    <CFormTextarea id="dailyActivity" v-model="formData.dailyActivity" rows="3">
                                    </CFormTextarea>
                                </CCol>
                                <CCol md="12">
                                    <CFormLabel for="fitnessGoals">Tujuan Kebugaran</CFormLabel>
                                    <CFormTextarea id="fitnessGoals" v-model="formData.fitnessGoals" rows="3">
                                    </CFormTextarea>
                                </CCol>
                                <CCol md="12">
                                    <CFormLabel for="medicalHistory">Riwayat Medis</CFormLabel>
                                    <CFormTextarea id="medicalHistory" v-model="formData.medicalHistory" rows="3">
                                    </CFormTextarea>
                                </CCol>
                                
                            </div>
                        </CForm>
                        
                        
                        <CButton type="button" color="primary" @click="saveChanges">Save</CButton>&nbsp;
                        <CButton type="button" color="warning" @click="navigateToUser">Back</CButton>

                    </CFormGroup>
                    
                </CCardBody>
            </CCard>

            <Specialization class="mt-3" />
            <Certification class="mt-3"/>
            
        </CCol>
    </CRow>
</template>



<script>
import axios from 'axios';
import Specialization from './Specialization.vue';
import Certification from './Certification.vue';

export default {
  components: {
    Specialization,
    Certification
  },
    data() {
        return {
            formData: {
                profilePhoto: '',
                memberId: '',
                memberType: '',
                fullName: '',
                position: '',
                bio: 'Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...',
                gender: '',
                dob: '',
                address: '',
                phoneNumber: '',
                email: '',
                password: '',
                repassword: '',
                height: '',
                weight: '',
                bloodType: '',
                dailyActivity: '',
                fitnessGoals: '',
                medicalHistory: ''
            },
            profilePhotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tom_Cruise_by_Gage_Skidmore.jpg/1200px-Tom_Cruise_by_Gage_Skidmore.jpg'
        };
    },
    mounted() {
        this.getUsersData(localStorage.getItem('id'));
    },
    methods: {
        async getUsersData(idUser) {
            try {
                const response = await axios.get(`http://localhost:8000/api/coaches/${idUser}`);
                this.users = response.data.data;
                console.log(this.users.tipe_anggota);
                this.formData = {
                    profilePhoto: '',
                    inputIdUser: this.users.id_user,
                    memberId: this.users.id,
                    memberType: this.users.tipe_anggota,
                    fullName: this.users.name,
                    gender: this.users.jenis_kelamin,
                    dob: this.users.tanggal_lahir,
                    address: this.users.alamat,
                    phoneNumber: this.users.telepon,
                    email: this.users.email,
                    height: this.users.berat_badan,
                    weight: this.users.tinggi_badan,
                    bloodType: this.users.golongan_darah,
                    // dailyActivity: this.users.name,
                    // fitnessGoals: this.users.name,
                    // medicalHistory: this.users.name
                };
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const file = event.target.files[0];
            this.formData.profilePhoto = file;

            const reader = new FileReader();
            reader.onload = e => {
                this.profilePhotoUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        async saveChanges() {
            try {
                const formData = new FormData();
                for (const key in this.formData) {
                    formData.append(key, this.formData[key]);
                }
              
                const response = await axios.post('http://localhost:8000/api/coaches/edit', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Data successfully saved:', response.data);
                this.$swal({
                    title: "Good job!",
                    text: "User data saved successfully!",
                    icon: "success"
                });

                // this.resetForm();
            } catch (error) {
                console.error('Error saving data:', error);
                this.$swal({
                    title: "Error!",
                    text: "There was an error saving the user data.",
                    icon: "error"
                });
            }
        },
        resetForm() {
            this.formData = {
                profilePhoto: '',
                memberId: '',
                memberType: '',
                fullName: '',
                gender: '',
                dob: '',
                address: '',
                phoneNumber: '',
                email: '',
                password: '',
                repassword: '',
                height: '',
                weight: '',
                bloodType: '',
                dailyActivity: '',
                fitnessGoals: '',
                medicalHistory: ''
            };
            this.profilePhotoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tom_Cruise_by_Gage_Skidmore.jpg/1200px-Tom_Cruise_by_Gage_Skidmore.jpg';
        },
        navigateToUser() {
            this.$router.push({ name: 'Users' });
        }
    }
};
</script>


<style>
.custom-photo {
    width: 200px;
    height: 200px;
    object-fit: cover;
}
</style>