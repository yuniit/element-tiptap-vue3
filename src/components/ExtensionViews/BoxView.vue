<template>
  <node-view-wrapper as="span" :class="imageViewClass" :style="marginStyle">
    <div
      :class="{
        'image-view__body': editor?.isEditable
      }"
    >
      <div :style="boxStyle" @click="onClickBox" />

      <el-popover
        :visible="selected && !isDragging"
        :disabled="!editor?.isEditable"
        :show-arrow="false"
        placement="top"
        popper-class="el-tiptap-image-popper"
      >
        <box-bubble-menu
          :node="node"
          :editor="editor"
          :update-attrs="updateAttributes"
        />

        <template #reference>
          <div class="image-view__body__placeholder" />
        </template>
      </el-popover>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { ElPopover } from 'element-plus';
import { ImageDisplay } from '@/utils/image';
import BoxBubbleMenu from '../MenuBubble/BoxBubbleMenu.vue';

const enum ResizeDirection {
  TOP_LEFT = 'tl',
  TOP_RIGHT = 'tr',
  BOTTOM_LEFT = 'bl',
  BOTTOM_RIGHT = 'br'
}

export default defineComponent({
  name: 'BoxView',

  components: {
    ElPopover,
    NodeViewWrapper,
    BoxBubbleMenu
  },

  props: nodeViewProps,

  data() {
    return {
      isDragging: false,
      resizeDirections: [
        ResizeDirection.TOP_LEFT,
        ResizeDirection.TOP_RIGHT,
        ResizeDirection.BOTTOM_LEFT,
        ResizeDirection.BOTTOM_RIGHT
      ],

      resizing: false,

      resizerState: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: ''
      }
    };
  },

  computed: {
    width(): number {
      return this.node!.attrs['data-width'];
    },
    height(): number {
      return this.node!.attrs['data-height'];
    },
    display(): ImageDisplay {
      return this.node!.attrs['data-display'];
    },
    boxStyle(): string {
      const borderWidth = this.node?.attrs['data-border-width'];
      const borderColor = this.node?.attrs['data-border-color'] || '#000';

      return `border-style: solid; border-width:${borderWidth}px; border-color:${borderColor}; width:${this.width}px; height:${this.height}px;`;
    },
    marginStyle(): string {
      const margin = this.node!.attrs['data-margin'];
      return margin ? `margin: ${margin}` : '';
    },
    imageViewClass() {
      return ['image-view', `image-view--${this.display}`];
    }
  },

  methods: {
    // https://github.com/scrumpy/tiptap/issues/361#issuecomment-540299541
    onClickBox() {
      this.isDragging = false;
      this.editor?.commands.setNodeSelection(this.getPos!());
    }
  }
});
</script>
