import { BiPackage } from "react-icons/bi";
import { defineField } from "sanity";

const project = {
  name: "project",
  title: "Projects",
  description: "Project Schema",
  type: "document",
  icon: BiPackage,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the project",
    },
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.max(60).required(),
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Add a custom slug for the URL or generate one from the name",
      options: { source: "name" },
    },
    {
      name: "logo",
      title: "Project Logo",
      type: "image",
    },
    {
      name: "projectUrl",
      title: "Project URL",
      type: "url",
      description: "Leaving this URL blank will add a coming soon to the link.",
    },
    {
      name: "comingSoon",
      title: "Coming Soon",
      type: "boolean",
    },
    {
      name: "repository",
      title: "Repository URL",
      type: "url",
      description:
        'Leaving this URL blank will add a "No Repository" message to the link.',
    },
    defineField({
      name: "coverMedia",
      title: "Cover Media",
      type: "array",
      description: "Upload a cover image, GIF, or video for this project",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            metadata: ["lqip"],
          },
          fields: [
            {
              name: "alt",
              title: "Alt",
              type: "string",
            },
            {
              name: "width",
              title: "Width",
              type: "number",
              description: "Specify the width of the image in pixels",
            },
          ],
        },
        {
          type: "file",
          title: "Video",
          description: "Upload a video file",
          fields: [
            {
              name: "alt",
              title: "Alt",
              type: "string",
              description: "Description of the video for accessibility",
            },
            {
              name: "width",
              title: "Width",
              type: "number",
              description: "Specify the width of the video in pixels",
            },
          ],
        },
      ],
      validation: (rule) => rule.max(1), // Limit to one media item (either image or video)
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      description: "Write a full description about this project",
    }),
  ],
};

export default project;
