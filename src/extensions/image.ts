import { Editor, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import TiptapImage, { ImageOptions } from '@tiptap/extension-image';
import InsertImageCommandButton from '@/components/MenuCommands/Image/InsertImageCommandButton.vue';
import ImageView from '@/components/ExtensionViews/ImageView.vue';
import { ImageDisplay } from '@/utils/image';
import {
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_DISPLAY,
  DEFAULT_IMAGE_URL_REGEX,
} from '@/constants';

interface CustomImageOptions extends ImageOptions {
  defaultWidth: number | null;
  draggable: boolean
}
const Image = TiptapImage.extend<CustomImageOptions>({
  // https://github.com/ueberdosis/tiptap/issues/1206
  inline() {
    return true;
  },

  group() {
    return 'inline';
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: this.options.defaultWidth,
        parseHTML: (element) => {
          const width =
            element.style.width || element.getAttribute('width') || null;
          return width == null ? null : parseInt(width, 10);
        },
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => {
          const height =
            element.style.height || element.getAttribute('height') || null;
          return height == null ? null : parseInt(height, 10);
        },
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },
      display: {
        default: DEFAULT_IMAGE_DISPLAY,
        parseHTML: (element) => {
          const { cssFloat, display } = element.style;
          let dp =
            element.getAttribute('data-display') ||
            element.getAttribute('display');
          if (dp) {
            dp = /(inline|block|left|right)/.test(dp)
              ? dp
              : ImageDisplay.INLINE;
          } else if (cssFloat === 'left' && !display) {
            dp = ImageDisplay.FLOAT_LEFT;
          } else if (cssFloat === 'right' && !display) {
            dp = ImageDisplay.FLOAT_RIGHT;
          } else {
            dp = ImageDisplay.INLINE;
          }

          return dp;
        },
        renderHTML: (attributes) => {
          return {
            'data-display': attributes.display,
          };
        },
      },
      draggable: {
        default: this.options.draggable
      },
      margin: {
        default: null,
        parseHTML: (element) => {
          const margin =
            element.style.margin || element.getAttribute('data-margin') || element.getAttribute('margin');

          return margin;
        },
        renderHTML: (attributes) => {
          return {
            'data-margin': attributes.margin,
          };
        },
      },
    };
  },

  addOptions(): any {
    return {
      ...this.parent?.(),
      inline: true,
      buttonIcon: '',
      defaultWidth: DEFAULT_IMAGE_WIDTH,
      uploadRequest: null,
      urlPattern: DEFAULT_IMAGE_URL_REGEX,
      draggable: false,
      button({ editor, extension }: { editor: Editor; extension: any; t: (...args: any[]) => string }) {
        return {
          component: InsertImageCommandButton,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon,
          },
        };
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageView);
  },
  renderHTML({ HTMLAttributes }) {
    const margin = `margin: ${HTMLAttributes['data-margin']}`;
    const style = `${margin};`;

    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { style })];
  },
  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },
});

export default Image;
