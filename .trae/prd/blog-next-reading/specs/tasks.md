# Implementation Tasks
- Add a reusable blog component to render the “Next reading” block with title + summary for each item.
- Update the blog article route to compute the recommended list:
  - Load all posts from the `posts` collection
  - Exclude the current post by `id`
  - Sort by `data.date` descending
  - Take up to 3 items
  - Render the block only when the list is non-empty
- Validate rendering for edge cases:
  - Only 1 other post exists
  - Only 2 other posts exist
  - No other posts exist

# Files
- Create: `src/features/blog/components/next-reading.astro`
- Update: `src/pages/blog/[...slug].astro`

