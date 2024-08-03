<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      
     
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold my-2"
      >
        Settings
      </CDropdownHeader>
      <CDropdownItem component="button"
      type="button" @click="profile"> 
        <CIcon icon="cil-user" /> Profile
      </CDropdownItem>
      <!-- <CDropdownItem>
        <CIcon icon="cil-settings" /> Settings
      </CDropdownItem> -->
      
      <CDropdownItem component="button"
      type="button" @click="logout">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {

    const router = useRouter()

    function logout() {
      router.push({ name: 'Logout' })
    }

    function profile() {
      router.push({ name: 'My Profile' })
    }

    return {
      avatar: avatar,
      itemsCount: 42,
      logout,
      profile
    }
  },
}
</script>
