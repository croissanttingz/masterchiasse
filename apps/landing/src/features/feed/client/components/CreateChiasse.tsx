import { ExternalLink, FileText, Image, Plus, Video, X } from 'lucide-react'
import { useState } from 'react'
import { ApiClient } from '../../../../core/client'

interface CreateChiasseProps {
  onChiasseCreated: () => void
}

type ChiasseType = 'text' | 'image' | 'video' | 'external_link'

const chiasseTypes: { value: ChiasseType; label: string; icon: any }[] = [
  { value: 'text', label: 'Text', icon: FileText },
  { value: 'image', label: 'Image', icon: Image },
  { value: 'video', label: 'Video', icon: Video },
  { value: 'external_link', label: 'External Link', icon: ExternalLink },
]

export const CreateChiasse = ({ onChiasseCreated }: CreateChiasseProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    type: 'text' as ChiasseType,
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await ApiClient.feed.createChiasse.mutate({
        title: formData.title,
        content: formData.content,
        author: formData.author,
        type: formData.type,
      })

      // Reset form and close modal
      setFormData({ title: '', content: '', author: '', type: 'text' })
      setIsOpen(false)
      onChiasseCreated()
    } catch (err: any) {
      setError(err.message || 'Failed to create chiasse')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const getContentPlaceholder = () => {
    switch (formData.type) {
      case 'text':
        return 'Write your chiasse content...'
      case 'image':
        return 'Enter image URL or describe the image...'
      case 'video':
        return 'Enter video URL or embed code...'
      case 'external_link':
        return 'Enter the URL you want to share...'
      default:
        return 'Enter content...'
    }
  }

  if (!isOpen) {
    return (
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Chiasse
        </button>
      </div>
    )
  }

  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Add New Chiasse</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter chiasse title..."
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
            maxLength={100}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your name..."
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type *
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {chiasseTypes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: value }))}
                className={`flex flex-col items-center gap-1 p-3 border rounded-lg transition-colors ${
                  formData.type === value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            minLength={10}
            maxLength={5000}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder={getContentPlaceholder()}
          />
          <div className="text-xs text-gray-500 mt-1">
            {formData.content.length}/5000 characters
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            {isSubmitting ? 'Creating...' : 'Add Chiasse'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
