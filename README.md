[NO LONGER IN USE]

## Getting Started

1. Clone the repo
2. `npm install`
3. `npm run start`

The site automatically deploys on push to `main`.

## Update student or staff bios

To update an existing student or staff member, modify their file in the `/src/students` or `/src/staff` directory.

To add a new student or staff member, create a new markdown file in the appropriate directory with a `name` property at the top. Include a path to an image using the `image` key. Founders' files also have `pronouns` and `order` properties, which sets the order that they're displayed on the page.

```md
---
name: Jane Smith
image: /images/staff/jane-smith.jpeg
---

My name is Jane Smith and this is my bio.
```

## Update the navigation text links

Add, edit, or remove items from `/src/_data/navigation.json`.

## Update the navigation buttons

See `/src/_includes/partials/nav.njk`.
