<template>
  <div>
    <command-button
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.Image.buttons.insert_image.tooltip')"
      :readonly="isCodeViewMode"
      icon="square"
      :button-icon="buttonIcon"
      :command="addBox"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Editor } from '@tiptap/core';
import CommandButton from './CommandButton.vue';

export default defineComponent({
  name: 'ImageCommandButton',

  components: {
    CommandButton
  },

  props: {
    editor: {
      type: Editor,
      required: true
    },
    buttonIcon: {
      default: '',
      type: String
    }
  },

  setup() {
    const t = inject('t');
    const enableTooltip = inject('enableTooltip', true);
    const isCodeViewMode = inject('isCodeViewMode', false);

    return { t, enableTooltip, isCodeViewMode };
  },

  data() {
    return {
      imageUploadDialogVisible: false,
      uploading: false
    };
  },

  computed: {
    imageNodeOptions() {
      return this.editor.extensionManager.extensions.find(
        (e) => e.name === 'image'
      )!.options;
    }
  },

  methods: {
    addBox() {
      this.editor.commands.setBox();
    }
  }
});
</script>
