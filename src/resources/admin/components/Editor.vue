<template>
  <div>
    <tiptap-vuetify
      v-model="text.description"
      :extensions="extensions"
      :toolbar-attributes="{ color: 'black' }"
    />
  </div>
</template>

<script>
import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  props: ["content"],
  components: { TiptapVuetify },
  data: () => ({
    extensions: [
      History,
      Blockquote,
      Underline,
      Strike,
      Italic,
      ListItem, // if you need to use a list (BulletList, OrderedList)
      BulletList,
      OrderedList,
      [
        Heading,
        {
          // Options that fall into the tiptap's extension
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak, // line break on Shift + Ctrl + Enter
    ],
  }),
  computed: {
    text: {
      get() {
        return this.content;
      },
      set(text) {
        this.$emit("update:content", text);
      },
    },
  },
};
</script>
