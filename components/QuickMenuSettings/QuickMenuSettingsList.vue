<template>
  <div class="demo-collapse m-10">
    <h2 class="mb-4">Menu settings</h2>
    <div class="flex items-center gap-2 m-2">
      <generic-button name="Save" type="success" @click="handleClick" />
      <generic-button
        name="Back"
        type="primary"
        icon-name-attribute="arrow-left"
        @click="$router.push('dashboard.htm')"
      />
    </div>
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
            @contextmenu="handleContextMenu(item, $event, index, 'parent')"
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
                  handleContextMenu(value, $event, index2, 'children', index)
                "
              >
                <generic-check-box
                  :order="index2"
                  :default-value="value?.checkedStatus"
                  :name="value?.name"
                  :text="value?.name"
                  @customFunction="updateChildCheckedStatus(item, index2)"
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
      <div class="modal-content flex flex-col gap-4" @click.stop="">
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
          <generic-button name="Закрыть" type="danger" @click="closeModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import GenericButton from '@generics/GenericButton.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'

export default {
  components: {
    Draggable,
    GenericButton,
    GenericCheckBox,
  },

  // PROPS
  props: {
    activemenu: {
      type: Array,
      default: () => [],
    },
    menuobj: {
      type: Object,
      default: () => ({}),
    },
  },

  // DATA
  data() {
    return {
      menuObject: {},
      activeMenuList: [],
      dragType: 'div',
      showModal: false,
      modalInput: '',
      actions: [],
      parentItem: {},
      allAccess: null,
    }
  },

  // MOUNTED
  mounted() {
    this.activeMenuList = this.activemenu
    this.menuObject = this.menuobj
  },

  // BEFOREDESTROY
  beforeDestroy() {
    window.removeEventListener('click', this.handleClickOutside)
  },

  // METHODS
  methods: {
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

    handleClick() {
      const menuObj = { ...this.menuObject, children: this.activeMenuList }
      const data = { id: 1, jsonTree: menuObj }

      this.$axios
        .post(`/user/editUserPerm`, data)
        .then((res) => {
          location.reload()
        })
        .catch(() => {})
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
  },
}
</script>

<style>
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
.modal-content {
  background-color: white;
  padding: 20px;
}
.modal button {
  padding: 10px 20px;
}
</style>
