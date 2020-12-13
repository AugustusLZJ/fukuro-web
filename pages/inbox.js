import Link from 'next/link'

const Inbox = () => {
  return (
    <div>
      This is a static page goto{' '}
      <Link href="/">
        <a>dynamic</a>
      </Link>{' '}
      page.
    </div>
  )
}

Inbox.withSearch = true

export default Inbox