import type { Editor } from '@tiptap/core';
import { Table as TiptapTable } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TablePopover from '@/components/MenuCommands/TablePopover/index.vue';

const Table = TiptapTable.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      button({
        editor,
        extension
      }: {
        editor: Editor
        extension: any
        t: (...args: any[]) => string
      }) {
        return {
          component: TablePopover,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon
          }
        };
      }
    };
  },

  addExtensions() {
    return [
      TableRow.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            class: {
              default: null,
              parseHTML: (element) => element.getAttribute('class'),
              renderHTML: (attributes) => {
                if (attributes.class) {
                  return {
                    class: attributes.class
                  };
                }
              }
            }
          };
        }
      }),
      TableHeader.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            class: {
              default: null,
              parseHTML: (element) => element.getAttribute('class'),
              renderHTML: (attributes) => {
                if (attributes.class) {
                  return {
                    class: attributes.class
                  };
                }
              }
            }
          };
        }
      }),
      TableCell.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            class: {
              default: null,
              parseHTML: (element) => element.getAttribute('class'),
              renderHTML: (attributes) => {
                if (attributes.class) {
                  return {
                    class: attributes.class
                  };
                }
              }
            }
          };
        }
      })
    ];
  }
});

export default Table;
