<template>
  <div class="image-bubble-menu">
    <el-popover
      placement="top"
      trigger="click"
      popper-class="el-tiptap-popper"
      ref="popoverRef"
    >
      <div class="el-tiptap-popper__menu">
        <div
          v-for="display in displayCollection"
          :key="display"
          :class="{
            'el-tiptap-popper__menu__item--active': display === currDisplay
          }"
          class="el-tiptap-popper__menu__item"
          @mousedown="hidePopover"
          @click="updateAttrs!({'data-display': display })"
        >
          <span>{{
            t(`editor.extensions.Image.buttons.display.${display}`)
          }}</span>
        </div>
      </div>

      <template #reference>
        <span>
          <command-button
            :enable-tooltip="enableTooltip"
            :tooltip="t('editor.extensions.Image.buttons.display.tooltip')"
            icon="image-align"
            :button-icon="''"
          />
        </span>
      </template>
    </el-popover>

    <command-button
      :command="openEditImageDialog"
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.Image.buttons.image_options.tooltip')"
      icon="ellipsis-h"
      :button-icon="''"
    />

    <el-dialog
      v-model="editImageDialogVisible"
      title="Edit Box"
      :append-to-body="true"
      width="400px"
      class="el-tiptap-edit-image-dialog"
      @open="syncImageAttrs"
    >
      <el-form :model="imageAttrs" label-position="top" size="small">
        <el-form-item>
          <el-col :span="11">
            <el-form-item
              :label="
                t('editor.extensions.Image.control.edit_image.form.width')
              "
            >
              <el-input v-model="imageAttrs.width" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item
              :label="
                t('editor.extensions.Image.control.edit_image.form.height')
              "
            >
              <el-input v-model="imageAttrs.height" type="number" />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="11">
            <el-form-item label="Border Width">
              <el-input v-model="imageAttrs['border-width']" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="Margin">
              <el-input
                v-model="imageAttrs.margin"
                placeholder="top right bottom left "
              />
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="small" round @click="closeEditImageDialog">
          {{ t('editor.extensions.Image.control.edit_image.cancel') }}
        </el-button>

        <el-button type="primary" size="small" round @click="updateImageAttrs">
          {{ t('editor.extensions.Image.control.edit_image.confirm') }}
        </el-button>
      </template>
    </el-dialog>

    <command-button
      :command="removeImage"
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.Image.buttons.remove_image.tooltip')"
      icon="trash-alt"
      button-icon=""
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { nodeViewProps } from '@tiptap/vue-3';
import {
  ElPopover,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElCol,
  ElButton
} from 'element-plus';
import { ImageDisplay } from '@/utils/image';
import CommandButton from '../MenuCommands/CommandButton.vue';

export default defineComponent({
  components: {
    CommandButton,
    ElPopover,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElCol,
    ElButton
  },
  props: {
    editor: nodeViewProps.editor,
    node: nodeViewProps.node,
    updateAttrs: nodeViewProps.updateAttributes
  },
  data() {
    return {
      displayCollection: [
        ImageDisplay.INLINE,
        ImageDisplay.BREAK_TEXT,
        ImageDisplay.FLOAT_LEFT,
        ImageDisplay.FLOAT_RIGHT
      ],
      editImageDialogVisible: false,
      imageAttrs: this.getImageAttrs()
    };
  },
  setup() {
    const t = inject('t');
    const enableTooltip = inject('enableTooltip', true);

    return { t, enableTooltip };
  },
  computed: {
    currDisplay() {
      return this.node!.attrs['data-display'];
    }
  },
  methods: {
    hidePopover() {
      this.$refs.popoverRef?.hide();
    },
    syncImageAttrs() {
      this.imageAttrs = this.getImageAttrs();
    },
    getImageAttrs() {
      return {
        width: this.node!.attrs['data-width'],
        height: this.node!.attrs['data-height'],
        margin: this.node!.attrs['data-margin'],
        'border-width': this.node!.attrs['data-border-width'],
        'border-color': this.node!.attrs['data-border-color']
      };
    },
    updateImageAttrs() {
      let { width, height } = this.imageAttrs;

      // input converts it to string
      width = parseInt(width as string, 10);
      height = parseInt(height as string, 10);

      this.updateAttrs!({
        'data-width': width >= 0 ? width : null,
        'data-height': height >= 0 ? height : null,
        'data-margin': this.imageAttrs.margin || '',
        'data-border-width': parseInt(this.imageAttrs['border-width']),
        'data-border-color': this.imageAttrs['border-color']
      });

      this.closeEditImageDialog();
    },
    openEditImageDialog() {
      this.editImageDialogVisible = true;
    },
    closeEditImageDialog() {
      this.editImageDialogVisible = false;
    },
    removeImage() {
      this.editor?.commands.deleteSelection();
    }
  }
});
</script>
