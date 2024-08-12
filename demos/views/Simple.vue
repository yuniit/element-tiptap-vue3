<template>
  <div class="el-tiptap-editor__wrapper">
    <el-tiptap
      :extensions="extensions"
      v-model:content="content"
      output="html"
    />

    <h1 @click="clickMe">Click Me</h1>

    <div style="margin-top: 8px; background-color: #eee">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { mergeAttributes } from '@tiptap/core';
import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Code,
  Link,
  Image,
  Blockquote,
  BulletList,
  OrderedList,
  TaskList,
  TextAlign,
  Indent,
  HardBreak,
  HorizontalRule,
  CodeView,
  Fullscreen,
  History,
  Box,
  FontSize
} from 'element-tiptap';

import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'; // import base style
import 'codemirror/mode/xml/xml.js'; // language
import 'codemirror/addon/selection/active-line.js'; // require active-line.js
import 'codemirror/addon/edit/closetag.js'; // autoCloseTags

const extensions = [
  Doc,
  Text,
  Paragraph,
  FontSize,
  Heading.configure({ level: 5 }),
  Bold.configure({ bubble: true }),
  Underline.configure({ bubble: true }),
  Italic.configure({ bubble: true }),
  Strike.configure({ bubble: true }),
  // Code,
  // Link.configure({ bubble: true }),
  Image,
  // Blockquote,
  TextAlign,
  // BulletList,
  // OrderedList,
  // TaskList,
  Indent,
  // HardBreak,
  // HorizontalRule.configure({ bubble: true }),
  // CodeView.configure({
  //   codemirror,
  //   codemirrorOptions: {
  //     styleActiveLine: true,
  //     autoCloseTags: true
  //   }
  // }),
  // Fullscreen,
  // History,
  Box.configure({ bubble: true, inline: true })
];

const content = ref('');

const clickMe = () => {
  console.log('content', content.value);
};
</script>

<style lang="scss">
span[data-type='box'] {
  display: inline-block;
  float: none;
  line-height: 0;
  margin: 0;
  max-width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  vertical-align: baseline;
  white-space: normal;

  &[data-display='left'] {
    position: absolute;
    left: 0;
    float: none;
  }
  &[data-display='right'] {
    position: absolute;
    right: 0;
    float: none;
  }
  &[data-display='inline'] {
    margin-left: 12px;
    margin-right: 12px;
  }
  &[data-display='block'] {
    display: flex;
    justify-content: center;
  }
}
</style>
