import { Node, mergeAttributes, type Editor } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import BoxButton from '@/components/MenuCommands/BoxButton.vue';
import BoxView from '@/components/ExtensionViews/BoxView.vue';
import { ImageDisplay } from '@/utils/image';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    box: {
      setBox: (options: {
        width?: string
        height?: string
        display?: ImageDisplay
        'border-width'?: number
        'border-color'?: string
      }) => ReturnType
    }
  }
}

const BoxNode = Node.create({
  name: 'box',
  inline() {
    return true;
  },
  group: 'inline',

  addAttributes() {
    return {
      'data-width': {
        default: this.options.width
      },
      'data-height': {
        default: this.options.height
      },
      'data-border-width': {
        default: this.options['border-width']
      },
      'data-border-color': {
        default: this.options['border-color']
      },
      'data-display': {
        default: this.options.display
      },
      'data-margin': {
        default: this.options.margin
      }
    };
  },
  addOptions() {
    return {
      ...this.parent?.(),
      width: 100,
      height: 100,
      display: 'inline',
      'border-width': 1,
      'border-color': '#000',
      button({
        editor,
        extension
      }: {
        editor: Editor
        extension: any
        t: (...args: any[]) => string
      }) {
        return {
          component: BoxButton,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon
          }
        };
      }
    };
  },
  addCommands() {
    return {
      setBox:
        (options) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options
            });
          }
    };
  },
  addNodeView() {
    return VueNodeViewRenderer(BoxView);
  },

  renderHTML({ HTMLAttributes }) {
    const width = `width: ${HTMLAttributes['data-width']}px`;
    const height = `height: ${HTMLAttributes['data-height']}px`;
    const border = `border: ${HTMLAttributes['data-border-width']}px solid ${HTMLAttributes['data-border-color']}`;
    const margin = HTMLAttributes['data-margin']
      ? `margin: ${HTMLAttributes['data-margin']}`
      : '';
    const style = `${width}; ${height}; ${border}; ${margin}`;

    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'box',
        style
      })
    ];
  },
  parseHTML() {
    return [{ tag: 'span' }];
  }
});

export default BoxNode;
