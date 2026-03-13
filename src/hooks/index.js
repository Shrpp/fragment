import { useState, useEffect } from 'react'

const MOCK_REPOS = [
  {
    id: 1,
    name: 'neural-compositor',
    description: 'Deep learning pipeline for real-time image synthesis using a custom transformer architecture',
    language: 'Python',
    stars: 284,
    url: '#',
    topics: ['ml', 'pytorch', 'cv'],
  },
  {
    id: 2,
    name: 'hex-protocol',
    description: 'Distributed consensus protocol with Byzantine fault tolerance and sub-100ms finality',
    language: 'Go',
    stars: 156,
    url: '#',
    topics: ['distributed', 'p2p'],
  },
  {
    id: 3,
    name: 'void-renderer',
    description: 'WebGPU-based voxel rendering engine with real-time global illumination at 60fps',
    language: 'TypeScript',
    stars: 423,
    url: '#',
    topics: ['webgpu', 'graphics'],
  },
  {
    id: 4,
    name: 'signal-mesh',
    description: 'P2P encrypted messaging layer with forward secrecy and deniable authentication',
    language: 'Rust',
    stars: 89,
    url: '#',
    topics: ['crypto', 'security'],
  },
  {
    id: 5,
    name: 'atlas-db',
    description: 'Embeddable time-series database optimized for high-frequency sensor data ingestion',
    language: 'C++',
    stars: 201,
    url: '#',
    topics: ['database', 'embedded'],
  },
]

const MOCK_POSTS = [
  {
    title: 'Building Real-Time Collaboration with CRDTs: A Practical Guide',
    date: 'Feb 2025',
    url: '#',
    tags: ['Architecture', 'Distributed'],
    readTime: '12 min read',
  },
  {
    title: 'WebGPU Is Ready: Moving Your Three.js App to the New API',
    date: 'Jan 2025',
    url: '#',
    tags: ['WebGPU', 'Performance'],
    readTime: '8 min read',
  },
  {
    title: "Rust's Ownership Model Explained Through Memory Diagrams",
    date: 'Dec 2024',
    url: '#',
    tags: ['Rust', 'Systems'],
    readTime: '15 min read',
  },
  {
    title: "The Hidden Cost of React's useEffect: A Deep Dive",
    date: 'Nov 2024',
    url: '#',
    tags: ['React', 'Performance'],
    readTime: '10 min read',
  },
  {
    title: 'Designing CLI Tools That Developers Actually Love',
    date: 'Oct 2024',
    url: '#',
    tags: ['UX', 'DevTools'],
    readTime: '7 min read',
  },
]

export function useClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const t = new Date()
      setTime(
        [t.getHours(), t.getMinutes(), t.getSeconds()]
          .map(n => String(n).padStart(2, '0'))
          .join(':')
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

export function useGitHubRepos(username = 'Shrpp') {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(
      `https://api.github.com/users/${username}/repos?sort=stargazers_count&per_page=6`,
      { signal: controller.signal }
    )
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API error: ${r.status}`)
        return r.json()
      })
      .then(data => {
        setRepos(data.map(r => ({
          id: r.id,
          name: r.name,
          description: r.description || '',
          language: r.language || 'Code',
          stars: r.stargazers_count,
          url: r.html_url,
          topics: r.topics || [],
        })))
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [username])

  return { repos, loading, error }
}

export function useGitHubStats(username) {
  const [stats, setStats] = useState({ repos: null, stars: null })

  useEffect(() => {
    if (!username) return
    const controller = new AbortController()
    const opts = { signal: controller.signal }

    Promise.all([
      fetch(`https://api.github.com/users/${username}`, opts).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, opts).then(r => r.json()),
    ])
      .then(([user, repos]) => {
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0
        setStats({ repos: (user.public_repos || 0) + 9, stars: totalStars })
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err)
      })

    return () => controller.abort()
  }, [username])

  return stats
}

export function useMediumPosts(username = 'YOUR_MEDIUM_USERNAME') {
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (username === 'YOUR_MEDIUM_USERNAME') {
      setPosts(MOCK_POSTS)
      setTotal(MOCK_POSTS.length)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const handle = username.replace(/^@/, '')
    const rss = `https://medium.com/feed/@${handle}`
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`

    fetch(api, { signal: controller.signal })
      .then(r => r.json())
      .then(data => {
        if (data.status !== 'ok') throw new Error(data.message || 'RSS feed error')
        const items = (data.items || []).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        setTotal(items.length)
        setPosts(items.slice(0, 5).map(item => ({
          title: item.title,
          date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          url: item.link,
          tags: item.categories || [],
          readTime: `${Math.ceil((item.content || '').replace(/<[^>]+>/g, '').split(' ').length / 200)} min read`,
        })))
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setPosts(MOCK_POSTS)
        setTotal(MOCK_POSTS.length)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [username])

  return { posts, total, loading, error }
}
