import { defineConfig, defineSchema } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      label: "Category",
      name: "category",
      path: "content/category",
      format: "md",
      list: "true",
      fields: [
        {
          label: "Title",
          name: "title",
          type: "string",
        },
      ]
    },
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          name: "hero",
          label: "Hero Content",
          type: "object",
          fields: [
            {
              name: "heading",
              label: "Hero Heading",
              type: "string"
            },
            {
              name: "Tagline",
              label: "Hero Tagline",
              type: "string",
            },
          ]
        },
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          }
          if (document._sys.filename === "about") {
            return '/about'
          }
          return undefined;
        },
      },
    },
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
        {
          type: "boolean",
          label: "Published?",
          name: "published",
        },
        {
          label: "Category",
          name: "category",
          type: "reference",
          collections: [
            'category'
          ]
        },
      ],
      ui: {
        router: ({ document }) => {
          return `/posts/${document._sys.filename}`;
        },
      },
    },
  ],
});

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema,
});

export default config;
