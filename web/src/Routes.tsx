// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import UserExamplesLayout from 'src/layouts/UserExamplesLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={UserExamplesLayout}>
        <Route path="/launches/{id:String}" page={LaunchLaunchPage} name="launchPage" />
        <Route path="/" page={LaunchLauchesPage} name="launchesPage" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
