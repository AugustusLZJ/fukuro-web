import { withAuthenticator } from '@aws-amplify/ui-react'

const pageWrapper = (page, {withAuth, withSearch, searchFunc}) => {
  let returnPage = withAuth? withAuthenticator(page) : page
  returnPage.withSearch = withSearch
  if (withSearch) {
    returnPage.searchFunc = searchFunc
  }
  return returnPage
}

export default pageWrapper