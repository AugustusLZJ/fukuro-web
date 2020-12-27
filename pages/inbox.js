import Link from 'next/link'
import pageWrapper from "./api/page-wrapper"

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

export default pageWrapper(Inbox, {
  withAuth: true,
  withSearch: true,
  searchFunc: (keyword) => {
    console.log(`Inbox: ${keyword}`)
  }
})