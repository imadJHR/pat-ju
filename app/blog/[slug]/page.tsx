import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPostBySlug } from "@/data/blog-posts"
import BlogPostClient from "./BlogPostClient"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Article non trouvé",
      description: "Cet article de blog n'existe pas.",
    }
  }

  return {
    title: `${post.title.fr} | Pâtisserie Marocaine`,
    description: post.excerpt.fr,
    openGraph: {
      title: post.title.fr,
      description: post.excerpt.fr,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    keywords: post.tags.join(", "),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}