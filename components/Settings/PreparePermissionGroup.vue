<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              pageType === 'view'
                ? 'View Permission Group'
                : pageType === 'edit'
                ? 'Edit Permission Group'
                : 'Add Permission Group'
            }}
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isOpen"
            >
              <img
                class="w-[11px]"
                :class="
                  isOpenTable
                    ? 'rotate-[-180deg] duration-[1s]'
                    : 'rotate-[0deg] duration-[1s]'
                "
                src="@assets/icons/arrow.png"
                alt="arrow"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isClose"
            >
              <img
                class="w-[11px]"
                src="@assets/icons/remove.png"
                alt="remove"
              />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="w-fit flex flex-col items-start m-2 gap-1">
          <generic-input
            name="name"
            width="250"
            :value="allInputAndLookUpValue?.name"
            @customFunction="getInputAndLookUpValueAction"
          />
          <div
            class="demo-collapse m-10 border-[1px] border-solid border-red-500"
          >
            <div>
              <div>
                <generic-check-box
                  :default-value="menuObject.checkedStatus"
                  :text="menuObject?.name"
                  @customFunction="updateCheckedStatus(menuObject)"
                />
              </div>
              <draggable
                v-if="activeMenuList.length"
                v-model="activeMenuList"
                class="columns-box w-fit"
                group="items"
                :tag="dragType"
                @end="handleDragEnd"
              >
                <div
                  v-for="(item, index) in activeMenuList"
                  :key="item?.id"
                  class="drag-me border"
                >
                  <div
                    class="flex items-center gap-2 justify-between cursor-pointer p-[5px]"
                    @contextmenu="
                      handleContextMenu(item, $event, index, 'parent')
                    "
                  >
                    <div class="flex gap-2 items-center">
                      <generic-check-box
                        :order="index"
                        :default-value="item?.checkedStatus"
                        :name="item?.name"
                        :text="item?.name"
                        @customFunction="updateCheckedStatus(item)"
                      />
                    </div>
                    <img
                      :class="{ 'rotate-0': item?.isOpen }"
                      src="@assets/icons/arrow.png"
                      alt="arrow"
                      class="w-[12px] -rotate-90"
                      @click="toggleList(item)"
                    />
                  </div>
                  <ul
                    v-if="item?.isOpen"
                    class="w-[200%] ml-[20px]"
                    style="transition: max-height"
                  >
                    <draggable
                      v-model="item.children"
                      class="columns-box cursor-pointer"
                      group="items"
                      @end="handleDragEnd"
                    >
                      <li
                        v-for="(value, index2) in item?.children"
                        :key="index2"
                        class="flex gap-2 cursor-pointer"
                        @contextmenu="
                          handleContextMenu(
                            value,
                            $event,
                            index2,
                            'children',
                            index
                          )
                        "
                      >
                        <generic-check-box
                          :order="index2"
                          :default-value="value?.checkedStatus"
                          :name="value?.name"
                          :text="value?.name"
                          @customFunction="
                            updateChildCheckedStatus(item, index2)
                          "
                        />
                      </li>
                    </draggable>
                  </ul>
                </div>
              </draggable>
              <div v-else>No data</div>
            </div>

            <!-- Модальное окно -->
            <div v-if="showModal" ref="modalRef" class="modal">
              <div class="flex flex-col gap-4 p-2 bg-white" @click.stop="">
                <h2>Модальное окно</h2>
                <div class="flex gap-1 items-center">
                  <div v-for="(action, index) in actions" :key="index">
                    <generic-check-box
                      :order="index"
                      :default-value="action?.status"
                      :name="action?.name"
                      :text="action?.name"
                      :border="true"
                      @customFunction="changeActionStatus(action.name, index)"
                    />
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <generic-button
                    name="fullAccess"
                    type="primary"
                    @click="changeAccess('full')"
                  />
                  <generic-button
                    name="Don'tAccess"
                    type="info"
                    @click="changeAccess('null')"
                  />
                  <generic-button
                    name="Закрыть"
                    type="danger"
                    @click="closeModal"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/permissionGroups.htm')"
            />
            <generic-button
              v-if="pageType !== 'view'"
              :name="pageType === 'edit' ? 'Save changes' : 'Save'"
              type="success"
              :icon-name-attribute="pageType === 'edit' && 'edit'"
              @click="saveAction"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  // COMPONENTS
  components: {
    Draggable,
    LoadingPage,
    GenericButton,
    GenericCheckBox,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      allInputAndLookUpValue: {},
      // permission
      menuObject: {},
      activeMenuList: [],
      dragType: 'div',
      showModal: false,
      actions: [],
      parentItem: {},
      // permission
    }
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
    // page TYPE ni aniqlash
    this.pageType = this.$route?.query?.page_type
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest()
  },

  // Methods
  methods: {
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // Page request
    getTableRequest() {
      if (this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/permissionGroup/preparePermissionGroup`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { jsonTree, permissionGroup } }) => {
            this.menuObject = jsonTree
            this.activeMenuList = jsonTree.children.map((item) => ({
              ...item,
              isOpen: false,
            }))
            this.allInputAndLookUpValue = permissionGroup
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/permissionGroup/preparePermissionGroup`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { jsonTree } }) => {
            this.menuObject = jsonTree
            this.activeMenuList = jsonTree.children.map((item) => ({
              ...item,
              isOpen: false,
            }))
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
    },

    // ============================================
    toggleList(item) {
      this.activeMenuList.forEach((menu) => {
        if (menu !== item) {
          menu.isOpen = false
        }
      })

      item.isOpen = !item.isOpen
    },

    updateCheckedStatus(item) {
      item.checkedStatus = !item.checkedStatus
      if (item.children) {
        item.children.map(
          (children, index) =>
            (children.checkedStatus = !children.checkedStatus)
        )
      }
    },

    updateChildCheckedStatus(item, index) {
      item.children[index].checkedStatus = !item.children[index].checkedStatus
    },

    handleDragEnd() {
      this.activeMenuList.forEach((item, index) => {
        item.order = index + 1
      })
    },

    // Save action
    saveAction() {
      const menuObj = { ...this.menuObject, children: this.activeMenuList }
      const stringifiedData = JSON.stringify(menuObj)
      const data = {
        permissionGroup: {
          id: this.pageID ? this.pageID : null,
          name: this.allInputAndLookUpValue?.name,
        },
        jsonTree: stringifiedData,
      }
      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios?.[method](
        `/permissionGroup/${
          this.pageID ? 'editPermissionGroup' : 'addPermissionGroup'
        }`,
        data
      )
        .then(() => {
          this.$router.push('/permissionGroups.htm')
          this.$notification('Success', 'Success', 'success')
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.error('Xatolik yuz berdi:', error)
          this.$notification('Error', 'Error', 'error')
        })
    },

    handleContextMenu(item, event, index, type, parentIndex) {
      event.preventDefault()
      this.showModal = true
      if (item.actions === null) {
        this.actions = item.children[0].actions
        this.parentItem = { item, index, type, parentIndex }
      } else {
        this.actions = item.actions
        this.parentItem = { item, index, type, parentIndex }
      }
    },

    closeModal() {
      this.showModal = false
    },

    handleClickOutside(event) {
      if (
        this.$refs.modalRef &&
        !this.$refs.modalRef.contains(event.target) &&
        !event.target.classList.contains('drag-me')
      ) {
        this.closeModal()
      }
    },

    changeActionStatus(name, index, parentType) {
      if (this.parentItem.type === 'children') {
        if (parentType) {
          if (parentType === 'full') {
            this.actions[index].status = true
          } else if (parentType === 'null') {
            this.actions[index].status = false
          }
        } else {
          this.actions[index].status = !this.actions[index].status
        }

        const selectedActions = this.actions
        this.activeMenuList[this.parentItem.parentIndex].children[
          this.parentItem.index
        ].actions = selectedActions
      } else if (this.parentItem.type === 'parent') {
        this.activeMenuList[this.parentItem.index].children.map((item) => {
          return item.actions.map((access) => {
            if (access.name === name) {
              if (parentType) {
                if (parentType === 'full') {
                  access.status = true
                } else if (parentType === 'null') {
                  access.status = false
                }
              } else {
                access.status = !access.status
              }
            }
            return ''
          })
        })
      }
    },

    changeAccess(type) {
      if (type === 'full') {
        this.actions.map((item, index) =>
          this.changeActionStatus(item.name, index, type)
        )
      } else if (type === 'null') {
        this.actions.map((item, index) =>
          this.changeActionStatus(item.name, index, type)
        )
      }
    },
    // ============================================
  },
}
</script>

<style scoped>
.drag-me {
  cursor: pointer;
}
.rotate-90 {
  transform: rotate(0deg);
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
