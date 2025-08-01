import { defineField, defineType } from "sanity";

export default defineType({
    name: "resume",
    type: "document",
    title: "Resume",
    fields: [
        defineField({
            name: "file",
            type: "file",
            title: "Resume File",
            description: "Upload your latest resume.",
            validation: (rule) => rule.required(), // Ensures a file is uploaded
        }),
        defineField({
            name: "filename",
            type: "string",
            title: "Download Filename",
            description: "Specify the filename for downloads (e.g., 'Krish-Patel-Resume-2024-12-24.pdf').",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "uploadedAt",
            type: "datetime",
            title: "Upload Date",
            description: "The date when this resume was uploaded.",
            validation: (rule) => rule.required(),
        }),
    ],
});