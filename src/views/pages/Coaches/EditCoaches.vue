<template>
    <CRow>
        <CCol :xs="12" :md="12">
            <CCard class="mb-3">
                <CCardHeader>
                    <strong>Account Details</strong>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :xs="12">
                            <CFormGroup>
                                <CForm class="row g-3 mb-3">
                                    <CCol md="2">
                                        <div class="text-center">
                                            <div class="profile-photo mb-3">
                                                <img :src="profilePhotoUrl" alt="Profile Photo" class=" custom-photo" />
                                            </div>
                                        </div>
                                    </CCol>
                                    <CCol md="10">
                                        <div class="py-1 px-3 mb-3 mt-2">
                                            <CButton color="info" variant="outline" @click="triggerFileInput"
                                                class="btn-sm mb-3">
                                                Change
                                                Profile
                                                Photo
                                            </CButton>
                                            <input type="file" ref="fileInput" @change="onFileChange"
                                                style="display: none;" id="profile_foto" name="profile_foto" />
                                            <div class="text-body-secondary small">Allowed JPG, GIF or PNG. Max size of
                                                800K
                                            </div>
                                        </div>
                                    </CCol>
                                    <hr class="mt-0" />
                                    <CCol md="6" style="display: none;">
                                        <CFormLabel for="memberId">ID Anggota</CFormLabel>
                                        <CFormInput type="text" id="memberId" v-model="formData.memberId" required
                                            disabled />
                                    </CCol>
                                    <CCol md="6">
                                        <CFormLabel for="fullName">Nama Lengkap</CFormLabel>
                                        <CFormInput type="text" id="fullName" v-model="formData.fullName" required />
                                    </CCol>
                                    <CCol md="6">
                                        <CFormLabel for="email">Email</CFormLabel>
                                        <CFormInput type="email" id="email" v-model="formData.email" required />
                                    </CCol>
                                    <CCol md="6">
                                        <CFormLabel for="phoneNumber">No. HP</CFormLabel>
                                        <CFormInput type="text" id="phoneNumber" v-model="formData.phoneNumber" required />
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
                                    <CCol md="6">
                                        <CFormLabel for="height">Tinggi Badan</CFormLabel>
                                        <CFormInput type="number" id="height" v-model="formData.height" required />
                                    </CCol>
                                    <CCol md="6">
                                        <CFormLabel for="weight">Berat Badan</CFormLabel>
                                        <CFormInput type="number" id="weight" v-model="formData.weight" required />
                                    </CCol>
                                    <CCol md="6">
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
                                        <CFormInput type="password" id="password" v-model="formData.password"
                                            required />
                                    </CCol>
                                    <CCol xs="6">
                                        <CFormLabel for="repassword">Re-Password</CFormLabel>
                                        <CFormInput type="password" id="repassword" v-model="formData.repassword"
                                            required />
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
                                            <CFormTextarea id="medicalHistory" v-model="formData.medicalHistory"
                                                rows="3">
                                            </CFormTextarea>
                                        </CCol>
                                    </div>
                                </CForm>

                                <CButton type="button" color="primary" @click="saveChanges">Save</CButton>&nbsp;
                                <CButton type="button" color="warning" @click="navigateToUser">Back</CButton>

                            </CFormGroup>

                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <Specialization class="mt-3" />
            <Certification class="mt-3" />
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
        this.getUsersData(this.$route.params.id);
    },
    methods: {
        async getUsersData(idUser) {
            try {
                const response = await axios.get(`http://localhost:8000/api/xyz/coaches/${idUser}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    },
                })
                this.users = response.data.data;
                console.log(this.users.tipe_anggota);
                this.formData = {
                    profilePhoto: '',
                    inputIdUser: this.users.id_user,
                    memberId: this.users.id,
                    memberType: this.users.tipe_anggota,
                    fullName: this.users.full_name,
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

                const response = await axios.post('http://localhost:8000/api/xyz/coaches/edit', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
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
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10%;
}
</style>