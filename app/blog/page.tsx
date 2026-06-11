'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { Heart, MessageCircle, Check } from 'lucide-react'

type Post = {
  name: string
  pet: string
  color: string
  time: string
  likes: number
  message: string
}

const posts: Post[] = [
  {
    name: 'Marcy R.',
    pet: 'mom of Biscuit',
    color: 'bg-amber-100 text-amber-700',
    time: '2h ago',
    likes: 24,
    message:
      'just wanted to say getting insurance for my golden was the best decision i ever made. he tore his ACL last month and i was freaking out about the cost but most of it got covered. still cant believe it honestly.',
  },
  {
    name: 'Devon T.',
    pet: 'dad of 2 cats',
    color: 'bg-blue-100 text-blue-700',
    time: '5h ago',
    likes: 41,
    message:
      'Hot take but everyone with a kitten should look into this stuff EARLY. waited too long with my first cat and by the time i signed up she already had a pre existing condition so it wasnt covered. dont make my mistake!!',
  },
  {
    name: 'Priya S.',
    pet: 'mom of Mango',
    color: 'bg-rose-100 text-rose-700',
    time: '8h ago',
    likes: 17,
    message:
      'my parrot mango needed a beak surgery (yes thats a real thing lol) and i had no idea exotic pets could even get insured. so glad i found a plan that covers birds. she is doing great now and back to screaming at 6am 🙃',
  },
  {
    name: 'Big Mike',
    pet: 'dad of Tank the bulldog',
    color: 'bg-emerald-100 text-emerald-700',
    time: '11h ago',
    likes: 58,
    message:
      'bulldogs are basically a vet bill with legs. love my boy to death but the breathing issues alone... anyway insurance has paid for itself like 3x over this year. worth every penny if u got a squishy faced dog.',
  },
  {
    name: 'Hannah L.',
    pet: 'mom of Luna & Pepper',
    color: 'bg-violet-100 text-violet-700',
    time: '1d ago',
    likes: 33,
    message:
      'reading through everyones stories and im tearing up a little. our community is so supportive. Luna is a senior now (14!) and im just grateful every day we planned ahead for her care.',
  },
  {
    name: 'Carlos M.',
    pet: 'dad of Rocky',
    color: 'bg-orange-100 text-orange-700',
    time: '1d ago',
    likes: 29,
    message:
      'PSA for new dog owners: read the waiting period section carefully!! i assumed coverage started right away and learned the hard way it dosent. ask questions before u sign anything.',
  },
  {
    name: 'Tasha',
    pet: 'mom of 3 rescues',
    color: 'bg-cyan-100 text-cyan-700',
    time: '2d ago',
    likes: 46,
    message:
      'adopted my third rescue last week and the first thing i did was get him covered. when youve seen what emergency vet bills look like you dont mess around. these babies deserve the best 🐾',
  },
  {
    name: 'Greg P.',
    pet: 'dad of Noodle',
    color: 'bg-pink-100 text-pink-700',
    time: '3d ago',
    likes: 12,
    message:
      'is it just me or does anyone elses dachshund have back problems lol. noodle slipped a disc and the surgery was insane $$. insurance saved us. wiener dog owners you KNOW what im talking about.',
  },
]

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false)
  const initials = post.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="break-inside-avoid mb-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${post.color}`}>
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{post.name}</p>
          <p className="text-xs text-zinc-400">{post.pet} · {post.time}</p>
        </div>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{post.message}</p>
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-zinc-50 dark:border-zinc-800">
        <button
          onClick={() => setLiked(!liked)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-rose-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400">
          <MessageCircle className="w-4 h-4" />
          Reply
        </span>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handlePost = () => {
    if (!name.trim() || !message.trim()) return
    // Illusion of participation: nothing is persisted.
    setSubmitted(true)
    setName('')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-zinc-900 dark:to-zinc-900">
      <PageHeader />
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 mb-3">Community Wall</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
            Stories from our pack
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-pretty">
            Real pet parents sharing how planning ahead helped them care for the animals they love.
          </p>
        </div>

        {/* Post composer */}
        <div className="max-w-xl mx-auto mb-12 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
          {submitted ? (
            <div className="flex items-start gap-3 py-2">
              <div className="shrink-0 w-9 h-9 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">Thanks for sharing!</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Your message will be reviewed and posted to the wall once approved.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Write another
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full mb-3 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your story with the community..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handlePost}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Post message
                </button>
              </div>
            </>
          )}
        </div>

        {/* Masonry of posts */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {posts.map((post) => (
            <PostCard key={post.name} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
