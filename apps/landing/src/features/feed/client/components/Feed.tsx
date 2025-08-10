import { ChevronDown, ChevronUp, Clock, MessageCircle, Share, User, FileText, Image, Video, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ApiClient } from '../../../../core/client'
import { CreateChiasse } from './CreateChiasse'
import { SortingTabs } from './SortingTabs'

type SortType = 'hot' | 'new' | 'top' | 'rising'

interface Chiasse {
  id: string
  title: string
  content: string
  countVotes: number
  author: string
  type: 'text' | 'image' | 'video' | 'external_link'
  createdAt: string | Date
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'text':
      return FileText
    case 'image':
      return Image
    case 'video':
      return Video
    case 'external_link':
      return ExternalLink
    default:
      return FileText
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'text':
      return 'Text'
    case 'image':
      return 'Image'
    case 'video':
      return 'Video'
    case 'external_link':
      return 'External Link'
    default:
      return 'Text'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'text':
      return 'bg-gray-50 text-gray-700'
    case 'image':
      return 'bg-green-50 text-green-700'
    case 'video':
      return 'bg-red-50 text-red-700'
    case 'external_link':
      return 'bg-blue-50 text-blue-700'
    default:
      return 'bg-gray-50 text-gray-700'
  }
}

export const Feed = () => {
  const [chiasses, setChiasses] = useState<Chiasse[]>([])
  const [loading, setLoading] = useState(true)
  const [votingStates, setVotingStates] = useState<Record<string, boolean>>({})
  const [currentSort, setCurrentSort] = useState<SortType>('hot')

  const fetchData = async (sortBy: SortType = currentSort) => {
    setLoading(true)
    try {
      const data = await ApiClient.feed.findManyChiasses.query({ sortBy })
      setChiasses(data)
    } catch (error) {
      console.error('Failed to fetch chiasses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSortChange = (newSort: SortType) => {
    setCurrentSort(newSort)
    fetchData(newSort)
  }

  const handleVote = async (chiasseId: string) => {
    if (votingStates[chiasseId]) return // Prevent double voting

    setVotingStates(prev => ({ ...prev, [chiasseId]: true }))

    try {
      await ApiClient.feed.voteChiasse.mutate({ id: chiasseId })
      
      // Update the chiasse count locally for immediate feedback
      setChiasses(prev => prev.map(chiasse => 
        chiasse.id === chiasseId 
          ? { ...chiasse, countVotes: chiasse.countVotes + 1 }
          : chiasse
      ))
    } catch (error) {
      console.error('Failed to vote:', error)
    } finally {
      setVotingStates(prev => ({ ...prev, [chiasseId]: false }))
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatTimeAgo = (dateString: string | Date) => {
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

      <CreateChiasse onChiasseCreated={() => fetchData(currentSort)} />
      
      <SortingTabs currentSort={currentSort} onSortChange={handleSortChange} />

      <div className="space-y-4">
        {chiasses.map((chiasse) => {
          const TypeIcon = getTypeIcon(chiasse.type)
          return (
            <article
              key={chiasse.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 overflow-hidden"
            >
              <div className="p-6">
                {/* Header with voting and metadata */}
                <div className="flex items-start gap-4">
                  {/* Voting section */}
                  <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <button 
                      onClick={() => handleVote(chiasse.id)}
                      disabled={votingStates[chiasse.id]}
                      className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                    >
                      <ChevronUp className="w-5 h-5 text-gray-500 hover:text-orange-500" />
                    </button>
                    <span className="text-sm font-semibold text-gray-700">{chiasse.countVotes}</span>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors opacity-50 cursor-not-allowed">
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Content section */}
                  <div className="flex-1 min-w-0">
                    {/* Title with type indicator */}
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                        {chiasse.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getTypeColor(chiasse.type)}`}>
                        <TypeIcon className="w-3 h-3" />
                        {getTypeLabel(chiasse.type)}
                      </span>
                    </div>

                    {/* Content preview */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {truncateContent(chiasse.content)}
                    </p>

                    {/* Metadata and actions */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{chiasse.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(chiasse.createdAt)}</span>
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
          )
        })}
      </div>

      {chiasses.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No chiasses found.</p>
        </div>
      )}
    </div>
  )
}
