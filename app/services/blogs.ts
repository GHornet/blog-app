export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

let blogs: Blog[] = [
  { id: 1, title: "Understanding Next.js App Router", author: "Matti Luukkainen", url: "https://example.com/1", likes: 5 },
  { id: 2, title: "Mastering React Server Components", author: "Juha Tauriainen", url: "https://example.com/2", likes: 3 },
  { id: 3, title: "Drizzle ORM for Beginners", author: "Outi Savolainen", url: "https://example.com/3", likes: 7 },
]

export function getBlogs() {
  // Сортируем по убыванию лайков (самые популярные сверху)
  return [...blogs].sort((a, b) => b.likes - a.likes)
}

export function getBlogById(id: number) {
  return blogs.find(blog => blog.id === id)
}

export function addBlog(title: string, author: string, url: string) {
  const newBlog: Blog = {
    id: blogs.length + 1,
    title,
    author,
    url,
    likes: 0,
  }
  blogs.push(newBlog)
  return newBlog
}

export function toggleLike(id: number) {
  const blog = blogs.find(b => b.id === id)
  if (blog) {
    blog.likes += 1
    return true
  }
  return false
}