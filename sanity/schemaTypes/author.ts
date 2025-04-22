import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: "author",
    title: "Author h ye",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "id",
            // title: "Name",
            type: "number",
        }),
        defineField({
            name: "name",
            // title: "Image",
            type: "string",
        }),
        defineField({
            name: "username",
            // title: "Image",
            type: "string",
        }),
        defineField({
            name: "email",
            // title: "Image",
            type: "string",
        }),
        defineField({
            name: "image",
            type: "url",
        }),
        defineField({
            name: "bio",
            // title: "Image",
            type: "text",
        }),
    ],
    preview: {
        select: {
            title: "name",
            // media: "image",
        },
    },
})
