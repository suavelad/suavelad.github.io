import { Link } from 'react-router-dom'
import { PageHeader, btnPrimary } from '../components/ui'

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="Page not found">
        The page you are looking for does not exist or has moved.
      </PageHeader>
      <div className="mt-8">
        <Link to="/" className={btnPrimary}>
          Back to home
        </Link>
      </div>
    </>
  )
}
