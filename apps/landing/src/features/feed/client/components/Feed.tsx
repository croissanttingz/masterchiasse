import { ChevronDown, ChevronUp, Clock, MessageCircle, Share, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ApiClient } from '../../../../core/client'

interface Article {
  id: string
  title: string
  content: string
  countVotes: number
  author: string
  createdAt: string
  tags: string[]
}

export const Feed = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const data = await ApiClient.feed.findManyArticles.query()
      setArticles(data)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Chiasses</h2>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 overflow-hidden"
          >
            <div className="p-6">
              {/* Header with voting and metadata */}
              <div className="flex items-start gap-4">
                {/* Voting section */}
                <div className="flex flex-col items-center gap-1 min-w-[50px]">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <ChevronUp className="w-5 h-5 text-gray-500 hover:text-orange-500" />
                  </button>
                  <span className="text-sm font-semibold text-gray-700">{article.countVotes}</span>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <ChevronDown className="w-5 h-5 text-gray-500 hover:text-orange-500" />
                  </button>
                </div>

                {/* Content section */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                    {article.title}
                  </h3>

                  {/* Content preview */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {truncateContent(article.content)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full hover:bg-blue-100 cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metadata and actions */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(article.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>discuss</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        <Share className="w-4 h-4" />
                        <span>share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found.</p>
        </div>
      )}
    </div>
  )
}
